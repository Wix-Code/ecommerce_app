import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Order data
const ongoingOrders = [
  {
    id: 1,
    name: "Regular Fit Slogan",
    size: "M",
    price: 120,
    status: "In transit",
    image: require("../../assets/images/7.jpg"),
  },
  {
    id: 2,
    name: "Cotton T-Shirt Blue",
    size: "L",
    price: 85,
    status: "Processing",
    image: require("../../assets/images/1.jpg"),
  },
  {
    id: 3,
    name: "Denim Jacket",
    size: "M",
    price: 150,
    status: "In transit",
    image: require("../../assets/images/2.jpg"),
  },
];

const completedOrders = [
  {
    id: 1,
    name: "Classic Running Shoes",
    size: "10",
    price: 110,
    status: "Delivered",
    image: require("../../assets/images/3.jpg"),
    deliveredDate: "Dec 20, 2024",
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    size: "32",
    price: 95,
    status: "Delivered",
    image: require("../../assets/images/4.jpg"),
    deliveredDate: "Dec 15, 2024",
  },
];

export default function Orders() {
  const [activeTab, setActiveTab] = useState<"ongoing" | "completed">(
    "ongoing",
  );

  const currentOrders =
    activeTab === "ongoing" ? ongoingOrders : completedOrders;
  const hasOrders = currentOrders.length > 0;

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

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <View style={styles.tabWrapper}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "ongoing" && styles.tabActive]}
            onPress={() => setActiveTab("ongoing")}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "ongoing" && styles.tabTextActive,
              ]}
            >
              Ongoing
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "completed" && styles.tabActive]}
            onPress={() => setActiveTab("completed")}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "completed" && styles.tabTextActive,
              ]}
            >
              Completed
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {hasOrders ? (
        // Orders List
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {currentOrders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              {/* Product Image */}
              <View style={styles.imageContainer}>
                <Image
                  style={styles.productImage}
                  source={order.image}
                  resizeMode="cover"
                />
              </View>

              {/* Order Info */}
              <View style={styles.orderInfo}>
                <View style={styles.orderHeader}>
                  <View style={styles.productDetails}>
                    <Text style={styles.productName}>
                      {order.name.slice(0, 15)}...
                    </Text>
                    <Text style={styles.productSize}>Size {order.size}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      activeTab === "completed" && styles.statusBadgeCompleted,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        activeTab === "completed" && styles.statusTextCompleted,
                      ]}
                    >
                      {order.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.orderFooter}>
                  <Text style={styles.productPrice}>${order.price}</Text>
                  {activeTab === "ongoing" ? (
                    <TouchableOpacity style={styles.trackButton}>
                      <Text style={styles.trackButtonText}>Track order</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.reviewButton}>
                      <Text style={styles.reviewButtonText}>Leave Review</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {/* {activeTab === "completed" && order.deliveredDate && (
                  <Text style={styles.deliveredDate}>
                    Delivered on {order.deliveredDate}
                  </Text>
                )} */}
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        // Empty State
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <FontAwesome5 name="box" size={64} color="#E6E6E6" />
          </View>
          <Text style={styles.emptyTitle}>
            {activeTab === "ongoing"
              ? "No Ongoing Orders!"
              : "No Completed Orders!"}
          </Text>
          <Text style={styles.emptyMessage}>
            {activeTab === "ongoing"
              ? "You don't have any ongoing orders\nat this time."
              : "You don't have any completed orders\nat this time."}
          </Text>
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
    letterSpacing: -1,
  },
  tabContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  tabWrapper: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 4,
    gap: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  tabActive: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontFamily: "OpenSans_500Medium",
    color: "#808080",
  },
  tabTextActive: {
    color: "#1A1A1A",
    fontFamily: "OpenSans_600SemiBold",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  orderCard: {
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
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#F5F5F5",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  orderInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    color: "#1A1A1A",
    fontSize: 14,
    fontFamily: "OpenSans_600SemiBold",
    marginBottom: 4,
  },
  productSize: {
    color: "#808080",
    fontSize: 12,
    fontFamily: "OpenSans_400Regular",
  },
  statusBadge: {
    backgroundColor: "#FFF3E0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusBadgeCompleted: {
    backgroundColor: "#E8F5E9",
  },
  statusText: {
    fontSize: 10,
    fontFamily: "OpenSans_600SemiBold",
    color: "#FF9800",
  },
  statusTextCompleted: {
    color: "#4CAF50",
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    color: "#1A1A1A",
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
  },
  trackButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#1A1A1A",
  },
  trackButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontFamily: "OpenSans_600SemiBold",
  },
  reviewButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#1A1A1A",
  },
  reviewButtonText: {
    color: "#1A1A1A",
    fontSize: 12,
    fontFamily: "OpenSans_600SemiBold",
  },
  deliveredDate: {
    color: "#808080",
    fontSize: 11,
    fontFamily: "OpenSans_400Regular",
    marginTop: 4,
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
  },
});
