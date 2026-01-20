import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="orders" />
      <Stack.Screen name="faqs" />
      <Stack.Screen name="help-center" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="payment-method" />
      <Stack.Screen name="address-book" />
    </Stack>
  );
}
