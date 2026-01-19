import { saved } from "@/app/dummyData";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const categories = [
  { id: "all", name: "All" },
  { id: "shoes", name: "Shoes" },
  { id: "shirts", name: "Shirts" },
  { id: "jeans", name: "Jeans" },
  { id: "jackets", name: "Jackets" },
  { id: "accessories", name: "Accessories" },
  { id: "sportswear", name: "Sportswear" },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = saved.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const hasProducts = filteredProducts && filteredProducts.length > 0;

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
        <TouchableOpacity onPress={() => router.push("/notifications")}>
          <FontAwesome5 name="bell" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#808080" />
          <TextInput
            placeholder="Search for clothes..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#808080"
          />
          <TouchableOpacity>
            <FontAwesome name="microphone" size={20} color="#808080" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <MaterialCommunityIcons name="tune-variant" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Categories - Horizontal Scroll */}
      <View style={styles.categoriesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && styles.categoryChipActive,
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {hasProducts ? (
        // Products Grid
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.gridContainer}>
            {filteredProducts.map((item) => (
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
                    <Ionicons name="heart-outline" size={20} color="#1A1A1A" />
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
            <Ionicons name="search-outline" size={64} color="#E6E6E6" />
          </View>
          <Text style={styles.emptyTitle}>No Products Found!</Text>
          <Text style={styles.emptyMessage}>
            Try adjusting your search or filters to find what you're looking
            for.
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
    fontSize: 32,
    fontFamily: "OpenSans_700Bold",
    color: "#1A1A1A",
    letterSpacing: -2,
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#E6E6E6",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    //paddingVertical: 12,
    height: 48,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
    color: "#1A1A1A",
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesWrapper: {
    height: 56,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: "center",
  },
  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    backgroundColor: "#ffffff",
    marginRight: 8,
    height: 40,
    justifyContent: "center",
  },
  categoryChipActive: {
    backgroundColor: "#1A1A1A",
    borderColor: "#1A1A1A",
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "OpenSans_500Medium",
    color: "#1A1A1A",
  },
  categoryTextActive: {
    color: "#ffffff",
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
    paddingTop: 8,
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
  },
});
