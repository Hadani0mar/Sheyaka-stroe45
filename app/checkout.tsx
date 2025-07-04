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

export default function CheckoutScreen() {
  const { cart, clearCart } = useCart();
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState(0);
  const [promoCode, setPromoCode] = useState('');

  const addresses = [
    {
      id: 0,
      name: 'المنزل',
      address: 'الرياض، حي النخيل، شارع الملك فهد، مبنى 123',
      phone: '+966 50 123 4567',
    },
    {
      id: 1,
      name: 'العمل',
      address: 'الرياض، حي العليا، شارع العليا العام، مكتب 456',
      phone: '+966 50 123 4567',
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
      style={[styles.addressCard, isSelected && styles.selectedCard]}
      onPress={() => setSelectedAddress(address.id)}
    >
      <View style={styles.addressHeader}>
        <View style={styles.addressIcon}>
          <MapPin size={20} color="#E53E3E" />
        </View>
        <View style={styles.addressInfo}>
          <Text style={styles.addressName}>{address.name}</Text>
          <Text style={styles.addressText} numberOfLines={2}>
            {address.address}
          </Text>
          <Text style={styles.addressPhone}>{address.phone}</Text>
        </View>
        {isSelected && (
          <View style={styles.selectedIcon}>
            <Check size={16} color="#FFFFFF" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const PaymentCard = ({ method, isSelected }: { method: any; isSelected: boolean }) => (
    <TouchableOpacity
      style={[styles.paymentCard, isSelected && styles.selectedCard]}
      onPress={() => setSelectedPayment(method.id)}
    >
      <View style={styles.paymentHeader}>
        <View style={styles.paymentIcon}>
          <method.icon size={20} color="#E53E3E" />
        </View>
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentName}>{method.name}</Text>
          <Text style={styles.paymentDetails}>{method.details}</Text>
        </View>
        {isSelected && (
          <View style={styles.selectedIcon}>
            <Check size={16} color="#FFFFFF" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
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
              placeholderTextColor="#9CA3AF"
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
              <Text style={styles.summaryValue}>﷼{subtotal}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>الضريبة (15%)</Text>
              <Text style={styles.summaryValue}>﷼{tax}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>الشحن</Text>
              <Text style={styles.summaryValue}>مجاني</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>المجموع الكلي</Text>
              <Text style={styles.totalValue}>﷼{total}</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>المجموع: ﷼{total}</Text>
        </View>
        <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
          <Text style={styles.orderButtonText}>تأكيد الطلب</Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#1F2937',
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Cairo-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  addressCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  selectedCard: {
    borderColor: '#E53E3E',
    backgroundColor: '#FEF2F2',
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF2F2',
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
    color: '#1F2937',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#6B7280',
    marginBottom: 4,
    lineHeight: 20,
  },
  addressPhone: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#9CA3AF',
  },
  selectedIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E53E3E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
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
    backgroundColor: '#FEF2F2',
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
    color: '#1F2937',
    marginBottom: 4,
  },
  paymentDetails: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#6B7280',
  },
  addButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  addButtonText: {
    fontSize: 14,
    fontFamily: 'Cairo-SemiBold',
    color: '#6B7280',
  },
  promoContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  promoInput: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    color: '#1F2937',
    textAlign: 'right',
  },
  promoButton: {
    backgroundColor: '#E53E3E',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Cairo-SemiBold',
  },
  summaryCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
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
  bottomContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    padding: 20,
  },
  totalContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  totalText: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#1F2937',
  },
  orderButton: {
    backgroundColor: '#E53E3E',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
  },
});