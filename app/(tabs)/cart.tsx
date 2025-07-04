import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Minus, Plus, Trash2, ShoppingBag, CreditCard } from 'lucide-react-native';
import { useCart } from '@/contexts/CartContext';

export default function CartScreen() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleQuantityChange = (id: number, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: number, productName: string) => {
    Alert.alert(
      'إزالة المنتج',
      `هل تريد إزالة "${productName}" من السلة؟`,
      [
        { text: 'إلغاء', style: 'cancel' },
        { text: 'إزالة', style: 'destructive', onPress: () => removeFromCart(id) },
      ]
    );
  };

  const handleClearCart = () => {
    Alert.alert(
      'مسح السلة',
      'هل تريد إزالة جميع المنتجات من السلة؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        { text: 'مسح', style: 'destructive', onPress: clearCart },
      ]
    );
  };

  const CartItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        {item.selectedColor && (
          <Text style={styles.productOption}>اللون: {item.selectedColor}</Text>
        )}
        {item.selectedSize && (
          <Text style={styles.productOption}>المقاس: {item.selectedSize}</Text>
        )}
        <Text style={styles.productPrice}>﷼{item.price}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(item.id, item.quantity, -1)}
        >
          <Minus size={16} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(item.id, item.quantity, 1)}
        >
          <Plus size={16} color="#6B7280" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveItem(item.id, item.name)}
      >
        <Trash2 size={20} color="#E53E3E" />
      </TouchableOpacity>
    </View>
  );

  const EmptyCart = () => (
    <View style={styles.emptyCart}>
      <ShoppingBag size={80} color="#D1D5DB" />
      <Text style={styles.emptyCartTitle}>السلة فارغة</Text>
      <Text style={styles.emptyCartMessage}>
        لم تقم بإضافة أي منتجات للسلة بعد
      </Text>
      <TouchableOpacity
        style={styles.shopNowButton}
        onPress={() => router.push('/(tabs)/')}
      >
        <Text style={styles.shopNowText}>ابدأ التسوق</Text>
      </TouchableOpacity>
    </View>
  );

  if (cart.items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>السلة</Text>
        </View>
        <EmptyCart />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>السلة ({cart.itemCount})</Text>
        <TouchableOpacity onPress={handleClearCart}>
          <Text style={styles.clearCartText}>مسح الكل</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cart.items}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => `${item.id}-${item.selectedColor}-${item.selectedSize}`}
        contentContainerStyle={styles.cartList}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <View style={styles.orderSummary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>المجموع الفرعي</Text>
          <Text style={styles.summaryValue}>﷼{cart.total}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>الشحن</Text>
          <Text style={styles.summaryValue}>مجاني</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>الضريبة</Text>
          <Text style={styles.summaryValue}>﷼{Math.round(cart.total * 0.15)}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>المجموع الكلي</Text>
          <Text style={styles.totalValue}>﷼{Math.round(cart.total * 1.15)}</Text>
        </View>
      </View>

      <View style={styles.checkoutContainer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => router.push('/checkout')}
        >
          <CreditCard size={20} color="#FFFFFF" />
          <Text style={styles.checkoutText}>إتمام الطلب</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#1F2937',
  },
  clearCartText: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#E53E3E',
  },
  cartList: {
    padding: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
    gap: 4,
  },
  productName: {
    fontSize: 16,
    fontFamily: 'Cairo-SemiBold',
    color: '#1F2937',
    lineHeight: 22,
  },
  productOption: {
    fontSize: 12,
    fontFamily: 'Cairo-Regular',
    color: '#6B7280',
  },
  productPrice: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#E53E3E',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 4,
    marginLeft: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
  },
  quantityText: {
    fontSize: 16,
    fontFamily: 'Cairo-SemiBold',
    color: '#1F2937',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
    marginLeft: 8,
  },
  separator: {
    height: 16,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyCartTitle: {
    fontSize: 24,
    fontFamily: 'Cairo-Bold',
    color: '#1F2937',
    marginTop: 24,
    marginBottom: 8,
  },
  emptyCartMessage: {
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
  orderSummary: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: 'Cairo-SemiBold',
    color: '#1F2937',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
    marginTop: 8,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#1F2937',
  },
  totalValue: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#E53E3E',
  },
  checkoutContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  checkoutButton: {
    flexDirection: 'row',
    backgroundColor: '#E53E3E',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  checkoutText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
  },
});