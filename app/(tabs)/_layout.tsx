import { Tabs } from 'expo-router';
import { Chrome as Home, ShoppingCart, User, Search, Heart, Moon, Sun } from 'lucide-react-native';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TabLayout() {
  const { cart } = useCart();
  const { theme, isDark, toggleTheme } = useTheme();

  const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: theme.colors.surface,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      paddingTop: 8,
      paddingBottom: 8,
      height: 70,
    },
    tabBarLabel: {
      fontFamily: 'Cairo-Regular',
      fontSize: 11,
      marginTop: -2,
    },
    cartIconContainer: {
      position: 'relative',
    },
    cartBadge: {
      position: 'absolute',
      top: -8,
      right: -8,
      backgroundColor: theme.colors.accent,
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cartBadgeText: {
      color: theme.colors.white,
      fontSize: 12,
      fontFamily: 'Cairo-Bold',
    },
    themeToggle: {
      position: 'absolute',
      top: 50,
      left: 20,
      zIndex: 1000,
      backgroundColor: theme.colors.surface,
      borderRadius: 25,
      padding: 10,
      ...theme.shadows.medium,
    },
  });

  return (
    <>
      <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
        {isDark ? (
          <Sun size={24} color={theme.colors.primary} />
        ) : (
          <Moon size={24} color={theme.colors.primary} />
        )}
      </TouchableOpacity>
      
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textMuted,
          tabBarLabelStyle: [styles.tabBarLabel, { color: theme.colors.text }],
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'الرئيسية',
            tabBarIcon: ({ size, color }) => (
              <Home size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'البحث',
            tabBarIcon: ({ size, color }) => (
              <Search size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'السلة',
            tabBarIcon: ({ size, color }) => (
              <View style={styles.cartIconContainer}>
                <ShoppingCart size={size} color={color} />
                {cart.itemCount > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cart.itemCount}</Text>
                  </View>
                )}
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: 'المفضلة',
            tabBarIcon: ({ size, color }) => (
              <Heart size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'الحساب',
            tabBarIcon: ({ size, color }) => (
              <User size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}