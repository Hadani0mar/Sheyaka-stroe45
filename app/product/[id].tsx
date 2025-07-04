import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Heart, Share2, ShoppingCart, Star, Shield, Truck, RotateCcw } from 'lucide-react-native';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/data/products';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState(false);

  const product = products.find(p => p.id === parseInt(id as string));

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>المنتج غير موجود</Text>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedColor,
      selectedSize,
    });
    router.push('/(tabs)/cart');
  };

  const ColorOption = ({ color }: { color: string }) => (
    <TouchableOpacity
      style={[
        styles.colorOption,
        selectedColor === color && styles.selectedColorOption
      ]}
      onPress={() => setSelectedColor(color)}
    >
      <Text style={[
        styles.colorText,
        selectedColor === color && styles.selectedColorText
      ]}>
        {color}
      </Text>
    </TouchableOpacity>
  );

  const SizeOption = ({ size }: { size: string }) => (
    <TouchableOpacity
      style={[
        styles.sizeOption,
        selectedSize === size && styles.selectedSizeOption
      ]}
      onPress={() => setSelectedSize(size)}
    >
      <Text style={[
        styles.sizeText,
        selectedSize === size && styles.selectedSizeText
      ]}>
        {size}
      </Text>
    </TouchableOpacity>
  );

  const FeatureItem = ({ feature }: { feature: string }) => (
    <View style={styles.featureItem}>
      <View style={styles.featureDot} />
      <Text style={styles.featureText}>{feature}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#1F2937" />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity>
              <Share2 size={24} color="#1F2937" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
              <Heart
                size={24}
                color={isFavorite ? "#E53E3E" : "#1F2937"}
                fill={isFavorite ? "#E53E3E" : "none"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          {product.discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>خصم {product.discount}%</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productCategory}>{product.categoryAr}</Text>
          
          <View style={styles.ratingContainer}>
            <Star size={16} color="#FCD34D" fill="#FCD34D" />
            <Text style={styles.rating}>{product.rating}</Text>
            <Text style={styles.reviewCount}>({product.reviews} تقييم)</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>﷼{product.price}</Text>
            {product.originalPrice > product.price && (
              <Text style={styles.originalPrice}>﷼{product.originalPrice}</Text>
            )}
          </View>

          <Text style={styles.description}>{product.description}</Text>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <View style={styles.optionsSection}>
              <Text style={styles.optionsTitle}>الألوان المتاحة</Text>
              <View style={styles.optionsContainer}>
                {product.colors.map((color, index) => (
                  <ColorOption key={index} color={color} />
                ))}
              </View>
            </View>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <View style={styles.optionsSection}>
              <Text style={styles.optionsTitle}>المقاسات المتاحة</Text>
              <View style={styles.optionsContainer}>
                {product.sizes.map((size, index) => (
                  <SizeOption key={index} size={size} />
                ))}
              </View>
            </View>
          )}

          {/* Features */}
          <View style={styles.featuresSection}>
            <Text style={styles.featuresTitle}>المميزات</Text>
            <View style={styles.featuresContainer}>
              {product.features.map((feature, index) => (
                <FeatureItem key={index} feature={feature} />
              ))}
            </View>
          </View>

          {/* Services */}
          <View style={styles.servicesSection}>
            <View style={styles.serviceItem}>
              <Truck size={24} color="#10B981" />
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitle}>شحن مجاني</Text>
                <Text style={styles.serviceDescription}>للطلبات فوق 200 ريال</Text>
              </View>
            </View>
            <View style={styles.serviceItem}>
              <RotateCcw size={24} color="#F59E0B" />
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitle}>إرجاع مجاني</Text>
                <Text style={styles.serviceDescription}>خلال 30 يوم</Text>
              </View>
            </View>
            <View style={styles.serviceItem}>
              <Shield size={24} color="#3B82F6" />
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitle}>ضمان الجودة</Text>
                <Text style={styles.serviceDescription}>منتجات أصلية 100%</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <ShoppingCart size={20} color="#FFFFFF" />
          <Text style={styles.addToCartText}>أضف إلى السلة</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buyNowText}>اشتري الآن</Text>
        </TouchableOpacity>
      </View>
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
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  imageContainer: {
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  productImage: {
    width: width,
    height: 400,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#E53E3E',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
  },
  productInfo: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    padding: 24,
    paddingBottom: 120,
  },
  productName: {
    fontSize: 24,
    fontFamily: 'Cairo-Bold',
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 32,
  },
  productCategory: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#6B7280',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  rating: {
    fontSize: 16,
    fontFamily: 'Cairo-SemiBold',
    color: '#1F2937',
  },
  reviewCount: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#6B7280',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  price: {
    fontSize: 28,
    fontFamily: 'Cairo-Bold',
    color: '#E53E3E',
  },
  originalPrice: {
    fontSize: 20,
    fontFamily: 'Cairo-Regular',
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 24,
  },
  optionsSection: {
    marginBottom: 24,
  },
  optionsTitle: {
    fontSize: 18,
    fontFamily: 'Cairo-SemiBold',
    color: '#1F2937',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorOption: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColorOption: {
    backgroundColor: '#E53E3E',
    borderColor: '#E53E3E',
  },
  colorText: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#1F2937',
  },
  selectedColorText: {
    color: '#FFFFFF',
  },
  sizeOption: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedSizeOption: {
    backgroundColor: '#E53E3E',
    borderColor: '#E53E3E',
  },
  sizeText: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#1F2937',
  },
  selectedSizeText: {
    color: '#FFFFFF',
  },
  featuresSection: {
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 18,
    fontFamily: 'Cairo-SemiBold',
    color: '#1F2937',
    marginBottom: 12,
  },
  featuresContainer: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E53E3E',
  },
  featureText: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#4B5563',
  },
  servicesSection: {
    gap: 16,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontFamily: 'Cairo-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  serviceDescription: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#6B7280',
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    flexDirection: 'row',
    gap: 12,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#E53E3E',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyNowText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'Cairo-Regular',
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 100,
  },
});