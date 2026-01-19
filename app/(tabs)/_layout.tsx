import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Platform } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Fontisto from '@expo/vector-icons/Fontisto';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1A1A1A',
        tabBarInactiveTintColor: '#808080',
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'OpenSans_600SemiBold',
          marginBottom: 4,
        },
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#fafafa',
          // paddingTop: 8,
          // paddingBottom: Platform.OS === 'ios' ? 20 : 12,
          // height: Platform.OS === 'ios' ? 88 : 72,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="heart" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="cart-shopping" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}