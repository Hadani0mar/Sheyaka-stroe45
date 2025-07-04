import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Heart, Share2, ShoppingCart, Shield, Truck, RotateCcw } from 'lucide-react-native';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import { supabase, Product } from '@/lib/supabase';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const { addToCart } = useCart();
  const { theme } = useTheme();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            name,
            name_ar
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        return;
      }

      setProduct(data);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const image = product.images && product.images.length > 0 ? product.images[0] : '';
    addToCart({
      id: product.id,
      name: product.name_ar,
      price: product.price,
      image,
      selectedColor,
      selectedSize,
    });
    router.push('/(tabs)/cart');
  };

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
    },
    headerActions: {
      flexDirection: 'row',
      gap: 16,
    },
    imageContainer: {
      backgroundColor: theme.colors.surface,
      position: 'relative',
    },
    productImage: {
      width: width,
      height: 400,
      resizeMode: 'cover',
    },
    noImageContainer: {
      width: width,
      height: 400,
      backgroundColor: theme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noImageText: {
      fontSize: 18,
      fontFamily: 'Cairo-Regular',
      color: theme.colors.textMuted,
    },
    productInfo: {
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: theme.borderRadius.xl,
      borderTopRightRadius: theme.borderRadius.xl,
      marginTop: -20,
      padding: 24,
      paddingBottom: 120,
    },
    productName: {
      fontSize: 24,
      fontFamily: 'Cairo-Bold',
      color: theme.colors.text,
      marginBottom: 8,
      lineHeight: 32,
    },
    productCategory: {
      fontSize: 14,
      fontFamily: 'Cairo-Regular',
      color: theme.colors.textSecondary,
      marginBottom: 12,
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
      color: theme.colors.primary,
    },
    currency: {
      fontSize: 20,
      fontFamily: 'Cairo-Regular',
      color: theme.colors.primary,
    },
    description: {
      fontSize: 16,
      fontFamily: 'Cairo-Regular',
      color: theme.colors.textSecondary,
      lineHeight: 24,
      marginBottom: 24,
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
      color: theme.colors.text,
      marginBottom: 2,
    },
    serviceDescription: {
      fontSize: 14,
      fontFamily: 'Cairo-Regular',
      color: theme.colors.textSecondary,
    },
    bottomActions: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.colors.surface,
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      flexDirection: 'row',
      gap: 12,
    },
    addToCartButton: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      paddingVertical: 16,
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    addToCartText: {
      color: theme.colors.white,
      fontSize: 16,
      fontFamily: 'Cairo-Bold',
    },
    buyNowButton: {
      flex: 1,
      backgroundColor: theme.colors.textSecondary,
      borderRadius: theme.borderRadius.md,
      paddingVertical: 16,
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buyNowText: {
      color: theme.colors.white,
      fontSize: 16,
      fontFamily: 'Cairo-Bold',
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
    errorText: {
      fontSize: 18,
      fontFamily: 'Cairo-Regular',
      color: theme.colors.error,
      textAlign: 'center',
      marginTop: 100,
    },
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>جاري تحميل المنتج...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>المنتج غير موجود</Text>
      </SafeAreaView>
    );
  }

  const image = product.images && product.images.length > 0 ? product.images[0] : '';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity>
              <Share2 size={24} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
              <Heart
                size={24}
                color={isFavorite ? theme.colors.error : theme.colors.text}
                fill={isFavorite ? theme.colors.error : "none"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Product Image */}
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.productImage} />
          ) : (
            <View style={styles.noImageContainer}>
              <Text style={styles.noImageText}>لا توجد صورة</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name_ar}</Text>
          {product.categories && (
            <Text style={styles.productCategory}>{product.categories.name_ar}</Text>
          )}
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{product.price}</Text>
            <Text style={styles.currency}>{product.currency === 'LYD' ? 'د.ل' : product.currency}</Text>
          </View>

          {product.description_ar && (
            <Text style={styles.description}>{product.description_ar}</Text>
          )}

          {/* Services */}
          <View style={styles.servicesSection}>
            <View style={styles.serviceItem}>
              <Truck size={24} color={theme.colors.success} />
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitle}>شحن مجاني</Text>
                <Text style={styles.serviceDescription}>للطلبات فوق 200 د.ل</Text>
              </View>
            </View>
            <View style={styles.serviceItem}>
              <RotateCcw size={24} color={theme.colors.warning} />
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitle}>إرجاع مجاني</Text>
                <Text style={styles.serviceDescription}>خلال 30 يوم</Text>
              </View>
            </View>
            <View style={styles.serviceItem}>
              <Shield size={24} color={theme.colors.primary} />
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
          <ShoppingCart size={20} color={theme.colors.white} />
          <Text style={styles.addToCartText}>أضف إلى السلة</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buyNowText}>اشتري الآن</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}