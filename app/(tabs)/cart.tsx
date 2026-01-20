import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Cart data with quantity
const initialCartItems = [
  {
    id: 1,
    name: "Regular Fit Slogan",
    size: "M",
    price: 120,
    quantity: 1,
    image: require("../../assets/images/7.jpg"),
  },
  {
    id: 2,
    name: "Cotton T-Shirt Blue",
    size: "L",
    price: 85,
    quantity: 2,
    image: require("../../assets/images/1.jpg"),
  },
  {
    id: 3,
    name: "Denim Jacket",
    size: "M",
    price: 150,
    quantity: 1,
    image: require("../../assets/images/2.jpg"),
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const hasItems = cartItems.length > 0;

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 10;
  const total = subtotal + shipping;

  const handleIncrement = (id: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleDecrement = (id: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from cart?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            setCartItems(cartItems.filter((item) => item.id !== id));
          },
        },
      ],
    );
  };

  const handleCheckout = () => {
    // Alert.alert("Checkout", `Proceeding to checkout with total: $${total}`);
    router.push("/(tabs)/(account)/payment-method");
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/(home)/notifications")}
        >
          <FontAwesome5 name="bell" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {hasItems ? (
        <View style={styles.container}>
          {/* Cart Items */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartCard}>
                {/* Product Image */}
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.productImage}
                    source={item.image}
                    resizeMode="cover"
                  />
                </View>

                {/* Product Info */}
                <View style={styles.productInfo}>
                  <View style={styles.productHeader}>
                    <View style={styles.productDetails}>
                      <Text style={styles.productName}>{item.name}</Text>
                      <Text style={styles.productSize}>Size: {item.size}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleDelete(item.id)}
                      style={styles.deleteButton}
                    >
                      <MaterialCommunityIcons
                        name="delete-outline"
                        size={22}
                        color="#FF3B30"
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.productFooter}>
                    <Text style={styles.productPrice}>${item.price}</Text>
                    <View style={styles.quantityControl}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleDecrement(item.id)}
                      >
                        <Ionicons name="remove" size={16} color="#1A1A1A" />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleIncrement(item.id)}
                      >
                        <Ionicons name="add" size={16} color="#1A1A1A" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Summary & Checkout */}
          <View style={styles.checkoutSection}>
            {/* Price Summary */}
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Sub-total</Text>
                <Text style={styles.summaryValue}>${subtotal}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping fee</Text>
                <Text style={styles.summaryValue}>${shipping}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${total}</Text>
              </View>
            </View>

            {/* Checkout Button */}
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
              activeOpacity={0.8}
            >
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
              <Feather name="arrow-right" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // Empty State
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <Ionicons name="cart-outline" size={64} color="#E6E6E6" />
          </View>
          <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
          <Text style={styles.emptyMessage}>
            Add items to your cart to get started
          </Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => router.push("/(tabs)/(home)")}
            activeOpacity={0.8}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "OpenSans_700Bold",
    color: "#1A1A1A",
    letterSpacing: -2,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  cartCard: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    backgroundColor: "#ffffff",
    marginBottom: 12,
  },
  imageContainer: {
    width: 90,
    height: 110,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#F5F5F5",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  productInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    color: "#1A1A1A",
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    marginBottom: 4,
  },
  productSize: {
    color: "#808080",
    fontSize: 12,
    fontFamily: "OpenSans_400Regular",
  },
  deleteButton: {
    padding: 4,
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    color: "#1A1A1A",
    fontSize: 18,
    fontFamily: "OpenSans_700Bold",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 4,
    gap: 12,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 14,
    fontFamily: "OpenSans_600SemiBold",
    color: "#1A1A1A",
    minWidth: 20,
    textAlign: "center",
  },
  checkoutSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
    backgroundColor: "#ffffff",
  },
  summaryCard: {
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    color: "#808080",
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: "OpenSans_600SemiBold",
    color: "#1A1A1A",
  },
  divider: {
    height: 1,
    backgroundColor: "#E6E6E6",
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
    color: "#1A1A1A",
  },
  totalValue: {
    fontSize: 18,
    fontFamily: "OpenSans_700Bold",
    color: "#1A1A1A",
  },
  checkoutButton: {
    flexDirection: "row",
    backgroundColor: "#1A1A1A",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  checkoutButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: "OpenSans_600SemiBold",
    color: "#1A1A1A",
    marginBottom: 12,
    textAlign: "center",
  },
  emptyMessage: {
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
    textAlign: "center",
    color: "#808080",
    lineHeight: 24,
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: "#1A1A1A",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  shopButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
  },
});
