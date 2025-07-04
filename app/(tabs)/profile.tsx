import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import { User, ShoppingBag, Heart, MapPin, CreditCard, Bell, Settings, CircleHelp as HelpCircle, LogOut, ChevronRight, Moon, Sun } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function ProfileScreen() {
  const { theme, isDark, toggleTheme } = useTheme();

  const menuItems = [
    {
      id: 1,
      title: 'طلباتي',
      icon: ShoppingBag,
      color: theme.colors.success,
      onPress: () => {},
    },
    {
      id: 2,
      title: 'المفضلة',
      icon: Heart,
      color: theme.colors.error,
      onPress: () => {},
    },
    {
      id: 3,
      title: 'العناوين',
      icon: MapPin,
      color: '#3B82F6',
      onPress: () => {},
    },
    {
      id: 4,
      title: 'طرق الدفع',
      icon: CreditCard,
      color: '#8B5CF6',
      onPress: () => {},
    },
    {
      id: 5,
      title: 'الإشعارات',
      icon: Bell,
      color: theme.colors.warning,
      onPress: () => {},
    },
    {
      id: 6,
      title: 'الإعدادات',
      icon: Settings,
      color: theme.colors.textSecondary,
      onPress: () => {},
    },
    {
      id: 7,
      title: 'المساعدة',
      icon: HelpCircle,
      color: '#14B8A6',
      onPress: () => {},
    },
    {
      id: 8,
      title: 'النمط الليلي',
      icon: isDark ? Sun : Moon,
      color: theme.colors.primary,
      onPress: toggleTheme,
    },
    {
      id: 9,
      title: 'تسجيل الخروج',
      icon: LogOut,
      color: theme.colors.error,
      onPress: () => {},
    },
  ];

  const MenuItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={[styles.menuItem, { borderBottomColor: theme.colors.border }]} onPress={item.onPress}>
      <View style={styles.menuItemLeft}>
        <View style={[styles.menuItemIcon, { backgroundColor: item.color }]}>
          <item.icon size={20} color={theme.colors.white} />
        </View>
        <Text style={[styles.menuItemTitle, { color: theme.colors.text }]}>{item.title}</Text>
      </View>
      <ChevronRight size={20} color={theme.colors.textMuted} />
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
    profileSection: {
      backgroundColor: theme.colors.surface,
      margin: 20,
      borderRadius: theme.borderRadius.lg,
      padding: 20,
      ...theme.shadows.medium,
    },
    profileCard: {
      alignItems: 'center',
      marginBottom: 20,
    },
    profileImageContainer: {
      position: 'relative',
      marginBottom: 16,
    },
    profileImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    editProfileButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    editProfileText: {
      color: theme.colors.white,
      fontSize: 12,
      fontFamily: 'Cairo-SemiBold',
    },
    profileInfo: {
      alignItems: 'center',
      gap: 4,
    },
    profileName: {
      fontSize: 20,
      fontFamily: 'Cairo-Bold',
      color: theme.colors.text,
      marginBottom: 4,
    },
    profileEmail: {
      fontSize: 14,
      fontFamily: 'Cairo-Regular',
      color: theme.colors.textSecondary,
    },
    profilePhone: {
      fontSize: 14,
      fontFamily: 'Cairo-Regular',
      color: theme.colors.textSecondary,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.md,
      padding: 16,
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statNumber: {
      fontSize: 24,
      fontFamily: 'Cairo-Bold',
      color: theme.colors.primary,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      fontFamily: 'Cairo-Regular',
      color: theme.colors.textSecondary,
    },
    statDivider: {
      width: 1,
      height: 40,
      backgroundColor: theme.colors.border,
      marginHorizontal: 16,
    },
    menuSection: {
      backgroundColor: theme.colors.surface,
      marginHorizontal: 20,
      marginBottom: 20,
      borderRadius: theme.borderRadius.lg,
      ...theme.shadows.medium,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      borderBottomWidth: 1,
    },
    menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    menuItemIcon: {
      width: 40,
      height: 40,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    menuItemTitle: {
      fontSize: 16,
      fontFamily: 'Cairo-Regular',
    },
    footer: {
      alignItems: 'center',
      padding: 20,
      marginBottom: 100,
    },
    footerText: {
      fontSize: 12,
      fontFamily: 'Cairo-Regular',
      color: theme.colors.textMuted,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>الحساب</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileCard}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.editProfileButton}>
                <Text style={styles.editProfileText}>تحرير</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>محمد أحمد</Text>
              <Text style={styles.profileEmail}>mohammed@example.com</Text>
              <Text style={styles.profilePhone}>+218 91 123 4567</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>الطلبات</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>المفضلة</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>التقييمات</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>إصدار التطبيق: 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}