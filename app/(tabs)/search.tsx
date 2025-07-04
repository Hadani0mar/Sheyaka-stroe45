import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Search, Filter, ShoppingCart, Heart } from 'lucide-react-native';
import { router } from 'expo-router';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getProducts, getCategories, searchProducts, getProductsByCategory, Product, Category } from '@/lib/supabase';

const { width } = Dimensions.get('window');
const PRODUCT_WIDTH = (width - 48) / 2;

export default function SearchScreen() {
  const { addToCart } = useCart();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, selectedCategory]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories()
      ]);
      
      setProducts(productsData);
      setCategories([{ id: 'all', name: 'All Products', name_ar: 'جميع المنتجات' } as Category, ...categoriesData]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      let results: Product[] = [];

      if (searchQuery.trim()) {
        results = await searchProducts(searchQuery);
      } else if (selectedCategory === 'all') {
        results = await getProducts();
      } else {
        results = await getProductsByCategory(selectedCategory);
      }

      setProducts(results);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    const image = product.images && product.images.length > 0 ? product.images[0] : '';
    addToCart({
      id: product.id,
      name: product.name_ar,
      price: product.price,
      image,
    });
  };

  const ProductCard = ({ product }: { product: Product }) => {
    const image = product.images && product.images.length > 0 ? product.images[0] : '';
    
    return (
      <TouchableOpacity
        style={[styles.productCard, { backgroundColor: theme.colors.card, ...theme.shadows.medium }]}
        onPress={() => router.push(`/product/${product.id}`)}
      >
        <View style={styles.productImageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.productImage} />
          ) : (
            <View style={[styles.productImage, { backgroundColor: theme.colors.border, justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={[styles.noImageText, { color: theme.colors.textMuted }]}>لا توجد صورة</Text>
            </View>
          )}
          <TouchableOpacity style={[styles.favoriteButton, { backgroundColor: theme.colors.surface }]}>
            <Heart size={20} color={theme.colors.textMuted} />
          </TouchableOpacity>
        </View>
        <View style={styles.productInfo}>
          <Text style={[styles.productName, { color: theme.colors.text }]} numberOfLines={2}>
            {product.name_ar}
          </Text>
          {product.categories && (
            <Text style={[styles.productCategory, { color: theme.colors.textMuted }]}>
              {product.categories.name_ar}
            </Text>
          )}
          <View style={styles.priceContainer}>
            <Text style={[styles.price, { color: theme.colors.primary }]}>
              {product.price} {product.currency === 'LYD' ? 'د.ل' : product.currency}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.addToCartButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => handleAddToCart(product)}
          >
            <ShoppingCart size={16} color={theme.colors.white} />
            <Text style={[styles.addToCartText, { color: theme.colors.white }]}>أضف للسلة</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const CategoryItem = ({ category }: { category: Category }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        { backgroundColor: selectedCategory === category.id ? theme.colors.primary : theme.colors.surface },
        theme.shadows.small
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <Text style={[
        styles.categoryText,
        { color: selectedCategory === category.id ? theme.colors.white : theme.colors.text }
      ]}>
        {category.name_ar}
      </Text>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      padding: 20,
      paddingTop: 40,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    headerTitle: {
      fontSize: 20,
      fontFamily: 'Cairo-Bold',
      color: theme.colors.text,
    },
    searchContainer: {
      flexDirection: 'row',
      padding: 20,
      gap: 12,
      backgroundColor: theme.colors.surface,
    },
    searchInputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: 16,
      paddingVertical: 12,
      gap: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      fontFamily: 'Cairo-Regular',
      color: theme.colors.text,
      textAlign: 'right',
    },
    filterButton: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.md,
      padding: 12,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    categoriesContainer: {
      backgroundColor: theme.colors.surface,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    categoriesList: {
      paddingHorizontal: 20,
    },
    categoryItem: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
    },
    categoryText: {
      fontSize: 14,
      fontFamily: 'Cairo-Regular',
    },
    resultsHeader: {
      padding: 20,
      paddingBottom: 12,
    },
    resultsText: {
      fontSize: 16,
      fontFamily: 'Cairo-SemiBold',
      color: theme.colors.text,
    },
    productsList: {
      paddingHorizontal: 20,
      paddingBottom: 100,
    },
    productRow: {
      justifyContent: 'space-between',
    },
    productCard: {
      borderRadius: theme.borderRadius.lg,
      padding: 12,
      width: PRODUCT_WIDTH,
    },
    productImageContainer: {
      position: 'relative',
    },
    productImage: {
      width: '100%',
      height: 140,
      borderRadius: theme.borderRadius.md,
      marginBottom: 12,
    },
    noImageText: {
      fontSize: 12,
      fontFamily: 'Cairo-Regular',
    },
    favoriteButton: {
      position: 'absolute',
      top: 8,
      right: 8,
      borderRadius: 20,
      padding: 6,
    },
    productInfo: {
      gap: 8,
    },
    productName: {
      fontSize: 14,
      fontFamily: 'Cairo-SemiBold',
      lineHeight: 20,
    },
    productCategory: {
      fontSize: 12,
      fontFamily: 'Cairo-Regular',
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    price: {
      fontSize: 16,
      fontFamily: 'Cairo-Bold',
    },
    addToCartButton: {
      flexDirection: 'row',
      borderRadius: theme.borderRadius.sm,
      paddingVertical: 8,
      paddingHorizontal: 12,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      marginTop: 4,
    },
    addToCartText: {
      fontSize: 12,
      fontFamily: 'Cairo-SemiBold',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      fontFamily: 'Cairo-Regular',
      color: theme.colors.textSecondary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>البحث</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={theme.colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="ابحث عن المنتجات..."
            placeholderTextColor={theme.colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={({ item }) => <CategoryItem category={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        />
      </View>

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {products.length} منتج
        </Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>جاري البحث...</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.productsList}
          columnWrapperStyle={styles.productRow}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      )}
    </SafeAreaView>
  );
}