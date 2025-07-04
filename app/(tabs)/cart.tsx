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
import { useTheme } from '@/contexts/ThemeContext';

export default function CartScreen() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { theme } = useTheme();

  const handleQuantityChange = (id: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: string, productName: string) => {
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
    <View style={[styles.cartItem, { backgroundColor: theme.colors.card, ...theme.shadows.medium }]}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.productImage} />
      ) : (
        <View style={[styles.productImage, { backgroundColor: theme.colors.border, justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={[styles.noImageText, { color: theme.colors.textMuted }]}>لا توجد صورة</Text>
        </View>
      )}
      <View style={styles.productDetails}>
        <Text style={[styles.productName, { color: theme.colors.text }]} numberOfLines={2}>{item.name}</Text>
        {item.selectedColor && (
          <Text style={[styles.productOption, { color: theme.colors.textMuted }]}>اللون: {item.selectedColor}</Text>
        )}
        {item.selectedSize && (
          <Text style={[styles.productOption, { color: theme.colors.textMuted }]}>المقاس: {item.selectedSize}</Text>
        )}
        <Text style={[styles.productPrice, { color: theme.colors.primary }]}>{item.price} د.ل</Text>
      </View>
      <View style={[styles.quantityContainer, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity
          style={[styles.quantityButton, { backgroundColor: theme.colors.surface }]}
          onPress={() => handleQuantityChange(item.id, item.quantity, -1)}
        >
          <Minus size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <Text style={[styles.quantityText, { color: theme.colors.text }]}>{item.quantity}</Text>
        <TouchableOpacity
          style={[styles.quantityButton, { backgroundColor: theme.colors.surface }]}
          onPress={() => handleQuantityChange(item.id, item.quantity, 1)}
        >
          <Plus size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveItem(item.id, item.name)}
      >
        <Trash2 size={20} color={theme.colors.error} />
      </TouchableOpacity>
    </View>
  );

  const EmptyCart = () => (
    <View style={styles.emptyCart}>
      <ShoppingBag size={80} color={theme.colors.textMuted} />
      <Text style={[styles.emptyCartTitle, { color: theme.colors.text }]}>السلة فارغة</Text>
      <Text style={[styles.emptyCartMessage, { color: theme.colors.textSecondary }]}>
        لم تقم بإضافة أي منتجات للسلة بعد
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
    clearCartText: {
      fontSize: 14,
      fontFamily: 'Cairo-Regular',
      color: theme.colors.error,
    },
    cartList: {
      padding: 20,
    },
    cartItem: {
      flexDirection: 'row',
      borderRadius: theme.borderRadius.lg,
      padding: 16,
      alignItems: 'center',
    },
    productImage: {
      width: 80,
      height: 80,
      borderRadius: theme.borderRadius.md,
      marginRight: 16,
    },
    noImageText: {
      fontSize: 10,
      fontFamily: 'Cairo-Regular',
    },
    productDetails: {
      flex: 1,
      gap: 4,
    },
    productName: {
      fontSize: 16,
      fontFamily: 'Cairo-SemiBold',
      lineHeight: 22,
    },
    productOption: {
      fontSize: 12,
      fontFamily: 'Cairo-Regular',
    },
    productPrice: {
      fontSize: 16,
      fontFamily: 'Cairo-Bold',
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: theme.borderRadius.sm,
      padding: 4,
      marginLeft: 12,
    },
    quantityButton: {
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6,
    },
    quantityText: {
      fontSize: 16,
      fontFamily: 'Cairo-SemiBold',
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
      marginTop: 24,
      marginBottom: 8,
    },
    emptyCartMessage: {
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
    orderSummary: {
      backgroundColor: theme.colors.surface,
      margin: 20,
      padding: 20,
      borderRadius: theme.borderRadius.lg,
      ...theme.shadows.medium,
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
      color: theme.colors.textSecondary,
    },
    summaryValue: {
      fontSize: 14,
      fontFamily: 'Cairo-SemiBold',
      color: theme.colors.text,
    },
    totalRow: {
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      paddingTop: 12,
      marginTop: 8,
      marginBottom: 0,
    },
    totalLabel: {
      fontSize: 16,
      fontFamily: 'Cairo-Bold',
      color: theme.colors.text,
    },
    totalValue: {
      fontSize: 18,
      fontFamily: 'Cairo-Bold',
      color: theme.colors.primary,
    },
    checkoutContainer: {
      padding: 20,
      backgroundColor: theme.colors.surface,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    checkoutButton: {
      flexDirection: 'row',
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      paddingVertical: 16,
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
    },
    checkoutText: {
      color: theme.colors.white,
      fontSize: 18,
      fontFamily: 'Cairo-Bold',
    },
  });

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
          <Text style={styles.summaryValue}>{cart.total} د.ل</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>الشحن</Text>
          <Text style={styles.summaryValue}>مجاني</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>الضريبة</Text>
          <Text style={styles.summaryValue}>{Math.round(cart.total * 0.15)} د.ل</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>المجموع الكلي</Text>
          <Text style={styles.totalValue}>{Math.round(cart.total * 1.15)} د.ل</Text>
        </View>
      </View>

      <View style={styles.checkoutContainer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => router.push('/checkout')}
        >
          <CreditCard size={20} color={theme.colors.white} />
          <Text style={styles.checkoutText}>إتمام الطلب</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}