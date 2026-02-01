import { saved } from "@/app/dummyData";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
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

// Sample trending searches
const trendingSearches = [
  "Summer Dresses",
  "Sneakers",
  "Leather Jackets",
  "Denim Jeans",
  "Hoodies",
  "Vintage T-Shirts",
];

// Sample categories
const categories = [
  { id: 1, name: "All", icon: "apps" },
  { id: 2, name: "Clothes", icon: "shirt" },
  { id: 3, name: "Shoes", icon: "shoe-heel" },
  { id: 4, name: "Bags", icon: "bag-handle" },
  { id: 5, name: "Accessories", icon: "watch" },
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([
    "Jeans",
    "White Sneakers",
    "Summer Dress",
  ]);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  // Filter saved items based on search query
  const filteredItems =
    saved?.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  const hasSavedItems = saved && saved.length > 0;
  const hasResults = filteredItems.length > 0;
  const showEmptySearch = isSearching && searchQuery && !hasResults;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  const handleRecentSearchClick = (search: string) => {
    setSearchQuery(search);
    setIsSearching(true);
  };

  const handleTrendingSearchClick = (search: string) => {
    setSearchQuery(search);
    setIsSearching(true);
    // Add to recent searches if not already there
    if (!recentSearches.includes(search)) {
      setRecentSearches([search, ...recentSearches].slice(0, 5));
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const removeRecentSearch = (searchToRemove: string) => {
    setRecentSearches(recentSearches.filter((s) => s !== searchToRemove));
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
        <TouchableOpacity onPress={() => router.push("/(tabs)/(home)")}>
          <Ionicons name="options-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#808080" />
          <TextInput
            placeholder="Search for clothes..."
            placeholderTextColor="#CCCCCC"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch}
            autoCorrect={false}
            returnKeyType="search"
          />
          {searchQuery ? (
            <TouchableOpacity onPress={clearSearch} activeOpacity={0.7}>
              <Ionicons name="close-circle" size={20} color="#CCCCCC" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity activeOpacity={0.7}>
              <FontAwesome name="microphone" size={20} color="#808080" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Filter Pills */}
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryPill,
                selectedCategory === category.id && styles.categoryPillActive,
              ]}
              onPress={() => setSelectedCategory(category.id)}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name={category.icon as any}
                size={18}
                color={selectedCategory === category.id ? "#ffffff" : "#1A1A1A"}
              />
              <Text
                style={[
                  styles.categoryPillText,
                  selectedCategory === category.id &&
                    styles.categoryPillTextActive,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {!isSearching ? (
          // Show Recent & Trending when not searching
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Recent Searches</Text>
                  <TouchableOpacity
                    onPress={clearRecentSearches}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.clearButton}>Clear All</Text>
                  </TouchableOpacity>
                </View>

                {recentSearches.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.recentSearchItem}
                    onPress={() => handleRecentSearchClick(search)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.recentSearchLeft}>
                      <Ionicons name="time-outline" size={20} color="#808080" />
                      <Text style={styles.recentSearchText}>{search}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => removeRecentSearch(search)}
                      activeOpacity={0.7}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Fontisto name="close" size={16} color="#CCCCCC" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Trending Searches */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Trending Searches</Text>
                <Ionicons name="trending-up" size={20} color="#FF6B6B" />
              </View>

              <View style={styles.trendingContainer}>
                {trendingSearches.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.trendingPill}
                    onPress={() => handleTrendingSearchClick(search)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.trendingPillText}>{search}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Popular Products (if has saved items) */}
            {hasSavedItems && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Popular Products</Text>
                <View style={styles.gridContainer}>
                  {saved.slice(0, 6).map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.productCard}
                      activeOpacity={0.8}
                      onPress={() => router.push(`/product/${item.id}`)}
                    >
                      <View style={styles.imageContainer}>
                        <Image
                          source={item.img}
                          style={styles.productImage}
                          resizeMode="cover"
                        />
                        <TouchableOpacity
                          style={styles.heartButton}
                          activeOpacity={0.7}
                        >
                          <Ionicons name="heart" size={20} color="#FF0000" />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.productInfo}>
                        <Text style={styles.productName} numberOfLines={2}>
                          {item.name}
                        </Text>
                        <Text style={styles.productPrice}>${item.price}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </>
        ) : showEmptySearch ? (
          // Empty Search Results
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Feather name="search" size={64} color="#E6E6E6" />
            </View>
            <Text style={styles.emptyTitle}>No Results Found</Text>
            <Text style={styles.emptyMessage}>
              We couldn't find any products matching "{searchQuery}". Try a
              different search term.
            </Text>
            <TouchableOpacity
              style={styles.browseButton}
              onPress={clearSearch}
              activeOpacity={0.8}
            >
              <Text style={styles.browseButtonText}>Clear Search</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Search Results
          <View style={styles.section}>
            <Text style={styles.resultsCount}>
              {filteredItems.length}{" "}
              {filteredItems.length === 1 ? "result" : "results"} found
            </Text>
            <View style={styles.gridContainer}>
              {filteredItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.productCard}
                  activeOpacity={0.8}
                  onPress={() => router.push(`/product/${item.id}`)}
                >
                  <View style={styles.imageContainer}>
                    <Image
                      source={item.img}
                      style={styles.productImage}
                      resizeMode="cover"
                    />
                    <TouchableOpacity
                      style={styles.heartButton}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="heart" size={20} color="#FF0000" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={2}>
                      {item.name}
                    </Text>
                    <Text style={styles.productPrice}>${item.price}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
    color: "#1A1A1A",
  },
  categoriesContainer: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  categoriesScrollContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    backgroundColor: "#ffffff",
    gap: 6,
  },
  categoryPillActive: {
    backgroundColor: "#1A1A1A",
    borderColor: "#1A1A1A",
  },
  categoryPillText: {
    fontSize: 14,
    fontFamily: "OpenSans_600SemiBold",
    color: "#1A1A1A",
  },
  categoryPillTextActive: {
    color: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "OpenSans_600SemiBold",
    color: "#1A1A1A",
    letterSpacing: -1,
  },
  clearButton: {
    fontSize: 14,
    fontFamily: "OpenSans_500Medium",
    color: "#808080",
    textDecorationLine: "underline",
  },
  recentSearchItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  recentSearchLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  recentSearchText: {
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
    color: "#1A1A1A",
  },
  trendingContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  trendingPill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
  },
  trendingPillText: {
    fontSize: 14,
    fontFamily: "OpenSans_500Medium",
    color: "#1A1A1A",
  },
  resultsCount: {
    fontSize: 14,
    fontFamily: "OpenSans_500Medium",
    color: "#808080",
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 10,
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
    lineHeight: 20,
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
    paddingTop: 60,
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
