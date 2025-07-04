import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Heart, ShoppingCart } from 'lucide-react-native';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');
const PRODUCT_WIDTH = (width - 48) / 2;

export default function FavoritesScreen() {
  const { addToCart } = useCart();
  const { theme } = useTheme();
  const [favorites, setFavorites] = useState<any[]>([]);

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleRemoveFromFavorites = (id: string) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  const ProductCard = ({ product }: { product: any }) => (
    <TouchableOpacity
      style={[styles.productCard, { backgroundColor: theme.colors.card, ...theme.shadows.medium }]}
      onPress={() => router.push(`/product/${product.id}`)}
    >
      <View style={styles.productImageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <TouchableOpacity
          style={[styles.favoriteButton, { backgroundColor: theme.colors.surface }]}
          onPress={() => handleRemoveFromFavorites(product.id)}
        >
          <Heart size={20} color={theme.colors.error} fill={theme.colors.error} />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={[styles.productName, { color: theme.colors.text }]} numberOfLines={2}>{product.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={[styles.price, { color: theme.colors.primary }]}>{product.price} د.ل</Text>
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

  const EmptyFavorites = () => (
    <View style={styles.emptyFavorites}>
      <Heart size={80} color={theme.colors.textMuted} />
      <Text style={[styles.emptyFavoritesTitle, { color: theme.colors.text }]}>لا توجد مفضلات</Text>
      <Text style={[styles.emptyFavoritesMessage, { color: theme.colors.textSecondary }]}>
        لم تقم بإضافة أي منتجات للمفضلة بعد
      </Text>
      <TouchableOpacity
        style={[styles.shopNowButton, { backgroundColor: theme.colors.primary }]}
        onPress={() => router.push('/(tabs)/')}
      >
        <Text style={[styles.shopNowText, { color: theme.colors.white }]}>ابدأ التسوق</Text>
      </TouchableOpacity>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      paddingTop: 40,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    headerTitle: {
      fontSize: 20,
      fontFamily: 'Cairo-Bold',
      color: theme.colors.text,
    },
    itemCount: {
      fontSize: 14,
      fontFamily: 'Cairo-Regular',
      color: theme.colors.textSecondary,
    },
    productsList: {
      padding: 20,
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
    emptyFavorites: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },
    emptyFavoritesTitle: {
      fontSize: 24,
      fontFamily: 'Cairo-Bold',
      marginTop: 24,
      marginBottom: 8,
    },
    emptyFavoritesMessage: {
      fontSize: 16,
      fontFamily: 'Cairo-Regular',
      textAlign: 'center',
      marginBottom: 32,
    },
    shopNowButton: {
      paddingHorizontal: 32,
      paddingVertical: 16,
      borderRadius: theme.borderRadius.md,
    },
    shopNowText: {
      fontSize: 16,
      fontFamily: 'Cairo-SemiBold',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>المفضلة</Text>
        {favorites.length > 0 && (
          <Text style={styles.itemCount}>{favorites.length} منتج</Text>
        )}
      </View>

      {favorites.length === 0 ? (
        <EmptyFavorites />
      ) : (
        <FlatList
          data={favorites}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={(item) => item.id.toString()}
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