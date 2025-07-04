import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { ShoppingCart, Star, Heart, Sparkles, TrendingUp, Tag } from 'lucide-react-native';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getProducts, getFeaturedProducts, Product } from '@/lib/supabase';

const { width } = Dimensions.get('window');
const PRODUCT_WIDTH = (width - 48) / 2;

export default function HomeScreen() {
  const { addToCart } = useCart();
  const { theme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const [allProducts, featured] = await Promise.all([
        getProducts(),
        getFeaturedProducts()
      ]);
      
      setProducts(allProducts);
      setFeaturedProducts(featured);
    } catch (error) {
      console.error('Error loading products:', error);
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
            <ShoppingCart size={18} color={theme.colors.white} />
            <Text style={[styles.addToCartText, { color: theme.colors.white }]}>أضف للسلة</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const SectionHeader = ({ title, icon: Icon, color }: { title: string; icon: any; color: string }) => (
    <View style={styles.sectionHeader}>
      <View style={[styles.sectionIconContainer, { backgroundColor: color }]}>
        <Icon size={20} color={theme.colors.white} />
      </View>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{title}</Text>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      padding: 20,
      paddingTop: 80,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 16,
    },
    logo: {
      width: 120,
      height: 120,
      resizeMode: 'contain',
    },
    welcomeText: {
      fontSize: 16,
      fontFamily: 'Cairo-Regular',
      color: theme.colors.textSecondary,
      marginBottom: 4,
    },
    appName: {
      fontSize: 32,
      fontFamily: 'Cairo-Bold',
      color: theme.colors.primary,
      marginBottom: 4,
    },
    tagline: {
      fontSize: 14,
      fontFamily: 'Cairo-Regular',
      color: theme.colors.textMuted,
      textAlign: 'center',
    },
    bannerContainer: {
      margin: 20,
      borderRadius: theme.borderRadius.lg,
      overflow: 'hidden',
      position: 'relative',
    },
    bannerImage: {
      width: '100%',
      height: 200,
    },
    bannerOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    bannerTitle: {
      fontSize: 24,
      fontFamily: 'Cairo-Bold',
      color: theme.colors.white,
      marginBottom: 8,
      textAlign: 'center',
    },
    bannerSubtitle: {
      fontSize: 16,
      fontFamily: 'Cairo-Regular',
      color: theme.colors.white,
      marginBottom: 16,
      textAlign: 'center',
    },
    shopNowButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: theme.borderRadius.sm,
    },
    shopNowText: {
      color: theme.colors.white,
      fontSize: 16,
      fontFamily: 'Cairo-SemiBold',
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      paddingBottom: 12,
    },
    sectionIconContainer: {
      width: 32,
      height: 32,
      borderRadius: theme.borderRadius.sm,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Cairo-SemiBold',
    },
    horizontalList: {
      paddingHorizontal: 20,
      paddingBottom: 20,
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
      backgroundColor: theme.colors.background,
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      fontFamily: 'Cairo-Regular',
      color: theme.colors.textSecondary,
    },
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>جاري تحميل المنتجات...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/file_00000000d00c61f8a723e1284038dd3a.png')}
              style={styles.logo}
            />
          </View>
          <Text style={styles.welcomeText}>مرحباً بك في</Text>
          <Text style={styles.appName}>شياكة</Text>
          <Text style={styles.tagline}>وجهتك للأناقة والتميز</Text>
        </View>

        {/* Featured Banner */}
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=1200' }}
            style={styles.bannerImage}
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>تشكيلة جديدة</Text>
            <Text style={styles.bannerSubtitle}>اكتشف أحدث صيحات الموضة</Text>
            <TouchableOpacity style={styles.shopNowButton}>
              <Text style={styles.shopNowText}>تسوق الآن</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <>
            <SectionHeader title="المنتجات المميزة" icon={Sparkles} color={theme.colors.success} />
            <FlatList
              data={featuredProducts}
              renderItem={({ item }) => <ProductCard product={item} />}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
            />
          </>
        )}

        {/* All Products */}
        <SectionHeader title="جميع المنتجات" icon={TrendingUp} color={theme.colors.primary} />
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        />

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}