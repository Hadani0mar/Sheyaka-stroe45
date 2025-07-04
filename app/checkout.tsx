import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, MapPin, CreditCard, Check, Truck } from 'lucide-react-native';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function CheckoutScreen() {
  const { cart, clearCart } = useCart();
  const { theme } = useTheme();
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState(0);
  const [promoCode, setPromoCode] = useState('');

  const addresses = [
    {
      id: 0,
      name: 'المنزل',
      address: 'طرابلس، حي الأندلس، شارع الجمهورية، مبنى 123',
      phone: '+218 91 123 4567',
    },
    {
      id: 1,
      name: 'العمل',
      address: 'طرابلس، حي الدهماني، شارع عمر المختار، مكتب 456',
      phone: '+218 91 123 4567',
    },
  ];

  const paymentMethods = [
    {
      id: 0,
      name: 'بطاقة ائتمانية',
      details: '**** **** **** 1234',
      icon: CreditCard,
    },
    {
      id: 1,
      name: 'الدفع عند الاستلام',
      details: 'ادفع عند وصول الطلب',
      icon: Truck,
    },
  ];

  const subtotal = cart.total;
  const tax = Math.round(subtotal * 0.15);
  const shipping = 0; // Free shipping
  const total = subtotal + tax + shipping;

  const handlePlaceOrder = () => {
    Alert.alert(
      'تأكيد الطلب',
      'هل تريد تأكيد الطلب؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'تأكيد',
          onPress: () => {
            clearCart();
            Alert.alert(
              'تم الطلب!',
              'تم إرسال طلبك بنجاح. سيتم التواصل معك قريباً.',
              [
                {
                  text: 'موافق',
                  onPress: () => router.push('/(tabs)/'),
                },
              ]
            );
          },
        },
      ]
    );
  };

  const AddressCard = ({ address, isSelected }: { address: any; isSelected: boolean }) => (
    <TouchableOpacity
      style={[
        styles.addressCard,
        { 
          borderColor: isSelected ? theme.colors.primary : theme.colors.border,
          backgroundColor: isSelected ? `${theme.colors.primary}10` : theme.colors.surface 
        }
      ]}
      onPress={() => setSelectedAddress(address.id)}
    >
      <View style={styles.addressHeader}>
        <View style={[styles.addressIcon, { backgroundColor: `${theme.colors.primary}20` }]}>
          <MapPin size={20} color={theme.colors.primary} />
        </View>
        <View style={styles.addressInfo}>
          <Text style={[styles.addressName, { color: theme.colors.text }]}>{address.name}</Text>
          <Text style={[styles.addressText, { color: theme.colors.textSecondary }]} numberOfLines={2}>
            {address.address}
          </Text>
          <Text style={[styles.addressPhone, { color: theme.colors.textMuted }]}>{address.phone}</Text>
        </View>
        {isSelected && (
          <View style={[styles.selectedIcon, { backgroundColor: theme.colors.primary }]}>
            <Check size={16} color={theme.colors.white} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const PaymentCard = ({ method, isSelected }: { method: any; isSelected: boolean }) => (
    <TouchableOpacity
      style={[
        styles.paymentCard,
        { 
          borderColor: isSelected ? theme.colors.primary : theme.colors.border,
          backgroundColor: isSelected ? `${theme.colors.primary}10` : theme.colors.surface 
        }
      ]}
      onPress={() => setSelectedPayment(method.id)}
    >
      <View style={styles.paymentHeader}>
        <View style={[styles.paymentIcon, { backgroundColor: `${theme.colors.primary}20` }]}>
          <method.icon size={20} color={theme.colors.primary} />
        </View>
        <View style={styles.paymentInfo}>
          <Text style={[styles.paymentName, { color: theme.colors.text }]}>{method.name}</Text>
          <Text style={[styles.paymentDetails, { color: theme.colors.textSecondary }]}>{method.details}</Text>
        </View>
        {isSelected && (
          <View style={[styles.selectedIcon, { backgroundColor: theme.colors.primary }]}>
            <Check size={16} color={theme.colors.white} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
      paddingTop: 40,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    headerTitle: {
      fontSize: 18,
      fontFamily: 'Cairo-Bold',
      color: theme.colors.text,
    },
    content: {
      flex: 1,
    },
    section: {
      backgroundColor: theme.colors.surface,
      margin: 16,
      borderRadius: theme.borderRadius.lg,
      padding: 16,
      ...theme.shadows.medium,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Cairo-SemiBold',
      color: theme.colors.text,
      marginBottom: 16,
    },
    addressCard: {
      borderWidth: 1,
      borderRadius: theme.borderRadius.md,
      padding: 16,
      marginBottom: 12,
    },
    addressHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    addressIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    addressInfo: {
      flex: 1,
    },
    addressName: {
      fontSize: 16,
      fontFamily: 'Cairo-SemiBold',
      marginBottom: 4,
    },
    addressText: {
      fontSize: 14,
      fontFamily: 'Cairo-Regular',
      marginBottom: 4,
      lineHeight: 20,
    },
    addressPhone: {
      fontSize: 14,
      fontFamily: 'Cairo-Regular',
    },
    selectedIcon: {
      width: 24,
      height: 24,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    paymentCard: {
      borderWidth: 1,
      borderRadius: theme.borderRadius.md,
      padding: 16,
      marginBottom: 12,
    },
    paymentHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    paymentIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    paymentInfo: {
      flex: 1,
    },
    paymentName: {
      fontSize: 16,
      fontFamily: 'Cairo-SemiBold',
      marginBottom: 4,
    },
    paymentDetails: {
      fontSize: 14,
      fontFamily: 'Cairo-Regular',
    },
    addButton: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.md,
      padding: 16,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderStyle: 'dashed',
    },
    addButtonText: {
      fontSize: 14,
      fontFamily: 'Cairo-SemiBold',
      color: theme.colors.textSecondary,
    },
    promoContainer: {
      flexDirection: 'row',
      gap: 12,
    },
    promoInput: {
      flex: 1,
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.md,
      padding: 16,
      fontSize: 16,
      fontFamily: 'Cairo-Regular',
      color: theme.colors.text,
      textAlign: 'right',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    promoButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: 24,
      paddingVertical: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    promoButtonText: {
      color: theme.colors.white,
      fontSize: 14,
      fontFamily: 'Cairo-SemiBold',
    },
    summaryCard: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.md,
      padding: 16,
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
    bottomContainer: {
      backgroundColor: theme.colors.surface,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      padding: 20,
    },
    totalContainer: {
      alignItems: 'center',
      marginBottom: 16,
    },
    totalText: {
      fontSize: 18,
      fontFamily: 'Cairo-Bold',
      color: theme.colors.text,
    },
    orderButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      paddingVertical: 16,
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    orderButtonText: {
      color: theme.colors.white,
      fontSize: 18,
      fontFamily: 'Cairo-Bold',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>إتمام الطلب</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>عنوان التسليم</Text>
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              isSelected={selectedAddress === address.id}
            />
          ))}
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>إضافة عنوان جديد</Text>
          </TouchableOpacity>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>طريقة الدفع</Text>
          {paymentMethods.map((method) => (
            <PaymentCard
              key={method.id}
              method={method}
              isSelected={selectedPayment === method.id}
            />
          ))}
        </View>

        {/* Promo Code */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>كود الخصم</Text>
          <View style={styles.promoContainer}>
            <TextInput
              style={styles.promoInput}
              placeholder="أدخل كود الخصم"
              placeholderTextColor={theme.colors.textMuted}
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <TouchableOpacity style={styles.promoButton}>
              <Text style={styles.promoButtonText}>تطبيق</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ملخص الطلب</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>المجموع الفرعي</Text>
              <Text style={styles.summaryValue}>{subtotal} د.ل</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>الضريبة (15%)</Text>
              <Text style={styles.summaryValue}>{tax} د.ل</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>الشحن</Text>
              <Text style={styles.summaryValue}>مجاني</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>المجموع الكلي</Text>
              <Text style={styles.totalValue}>{total} د.ل</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>المجموع: {total} د.ل</Text>
        </View>
        <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
          <Text style={styles.orderButtonText}>تأكيد الطلب</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}