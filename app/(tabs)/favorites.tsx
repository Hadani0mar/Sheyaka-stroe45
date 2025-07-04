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
import { Heart, Star, ShoppingCart } from 'lucide-react-native';
import { useCart } from '@/contexts/CartContext';

const { width } = Dimensions.get('window');
const PRODUCT_WIDTH = (width - 48) / 2;

// Mock favorites data - in a real app, this would come from state management
const mockFavorites = [
  {
    id: 1,
    name: "ساعة ذكية عصرية",
    price: 299,
    originalPrice: 399,
    discount: 25,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.5,
    reviews: 128,
  },
  {
    id: 2,
    name: "حقيبة جلدية فاخرة",
    price: 450,
    originalPrice: 600,
    discount: 25,
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.8,
    reviews: 89,
  },
];

export default function FavoritesScreen() {
  const { addToCart } = useCart();
  const [favorites, setFavorites] = useState(mockFavorites);

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleRemoveFromFavorites = (id: number) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  const ProductCard = ({ product }: { product: any }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => router.push(`/product/${product.id}`)}
    >
      <View style={styles.productImageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        {product.discount > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{product.discount}%</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => handleRemoveFromFavorites(product.id)}
        >
          <Heart size={20} color="#E53E3E" fill="#E53E3E" />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
        <View style={styles.ratingContainer}>
          <Star size={14} color="#FCD34D" fill="#FCD34D" />
          <Text style={styles.rating}>{product.rating}</Text>
          <Text style={styles.reviewCount}>({product.reviews})</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>﷼{product.price}</Text>
          {product.originalPrice > product.price && (
            <Text style={styles.originalPrice}>﷼{product.originalPrice}</Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => handleAddToCart(product)}
        >
          <ShoppingCart size={16} color="#FFFFFF" />
          <Text style={styles.addToCartText}>أضف للسلة</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const EmptyFavorites = () => (
    <View style={styles.emptyFavorites}>
      <Heart size={80} color="#D1D5DB" />
      <Text style={styles.emptyFavoritesTitle}>لا توجد مفضلات</Text>
      <Text style={styles.emptyFavoritesMessage}>
        لم تقم بإضافة أي منتجات للمفضلة بعد
      </Text>
      <TouchableOpacity
        style={styles.shopNowButton}
        onPress={() => router.push('/(tabs)/')}
      >
        <Text style={styles.shopNowText}>ابدأ التسوق</Text>
      </TouchableOpacity>
    </View>
  );

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#1F2937',
  },
  itemCount: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#6B7280',
  },
  productsList: {
    padding: 20,
    paddingBottom: 100,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    width: PRODUCT_WIDTH,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    marginBottom: 12,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#E53E3E',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Cairo-Bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 6,
  },
  productInfo: {
    gap: 8,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Cairo-SemiBold',
    color: '#1F2937',
    lineHeight: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 12,
    fontFamily: 'Cairo-Regular',
    color: '#6B7280',
  },
  reviewCount: {
    fontSize: 12,
    fontFamily: 'Cairo-Regular',
    color: '#9CA3AF',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#E53E3E',
  },
  originalPrice: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: '#E53E3E',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 4,
  },
  addToCartText: {
    color: '#FFFFFF',
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
    color: '#1F2937',
    marginTop: 24,
    marginBottom: 8,
  },
  emptyFavoritesMessage: {
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  shopNowButton: {
    backgroundColor: '#E53E3E',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  shopNowText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Cairo-SemiBold',
  },
});