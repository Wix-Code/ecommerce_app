import { saved } from "@/app/dummyData";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Saved() {
  const hasSavedItems = saved && saved.length > 0;

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Items</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {hasSavedItems ? (
        // Saved Items Grid
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.gridContainer}>
            {saved.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={styles.productCard}
                activeOpacity={0.8}
              >
                {/* Product Image */}
                <View style={styles.imageContainer}>
                  <Image
                    source={item.img}
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                  {/* Heart Icon */}
                  <TouchableOpacity
                    style={styles.heartButton}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="heart" size={20} color="#FF0000" />
                  </TouchableOpacity>
                </View>

                {/* Product Info */}
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {item.name}
                  </Text>
                  <Text style={styles.productPrice}>${item.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        // Empty State
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <Ionicons name="heart-outline" size={64} color="#E6E6E6" />
          </View>
          <Text style={styles.emptyTitle}>No Saved Items!</Text>
          <Text style={styles.emptyMessage}>
            You don't have any saved items. Go to home and add some.
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => router.push("/(tabs)/(home)")}
            activeOpacity={0.8}
          >
            <Text style={styles.browseButtonText}>Browse Products</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  productCard: {
    width: "48%",
    marginBottom: 16,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: 0.75,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  heartButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productInfo: {
    marginTop: 8,
    gap: 4,
  },
  productName: {
    fontSize: 14,
    fontFamily: "OpenSans_500Medium",
    color: "#1A1A1A",
  },
  productPrice: {
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
    color: "#1A1A1A",
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
    color: "#1A1A1A",
    fontSize: 20,
    marginBottom: 12,
    fontFamily: "OpenSans_600SemiBold",
    textAlign: "center",
  },
  emptyMessage: {
    color: "#808080",
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: "#1A1A1A",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  browseButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
  },
});
