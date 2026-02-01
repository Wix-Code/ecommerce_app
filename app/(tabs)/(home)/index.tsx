import { saved } from "@/app/dummyData";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Slider from "@react-native-community/slider";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Modal,
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

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const sortOptions = [
  { id: "default", label: "Default" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "name-az", label: "Name: A to Z" },
  { id: "name-za", label: "Name: Z to A" },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState("default");
  const [favorites, setFavorites] = useState<number[]>([]);

  // Temporary filter states (for modal)
  const [tempPriceRange, setTempPriceRange] = useState([0, 200]);
  const [tempSelectedSizes, setTempSelectedSizes] = useState<string[]>([]);
  const [tempSelectedSort, setTempSelectedSort] = useState("default");

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
    );
  };

  const toggleSize = (size: string) => {
    setTempSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const openFilterModal = () => {
    // Set temp values to current values
    setTempPriceRange(priceRange);
    setTempSelectedSizes(selectedSizes);
    setTempSelectedSort(selectedSort);
    setShowFilterModal(true);
  };

  const applyFilters = () => {
    setPriceRange(tempPriceRange);
    setSelectedSizes(tempSelectedSizes);
    setSelectedSort(tempSelectedSort);
    setShowFilterModal(false);
  };

  const resetFilters = () => {
    setTempPriceRange([0, 200]);
    setTempSelectedSizes([]);
    setTempSelectedSort("default");
  };

  // Filter and sort products
  let filteredProducts = saved.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPrice =
      item.price >= priceRange[0] && item.price <= priceRange[1];
    const matchesSize =
      selectedSizes.length === 0 || selectedSizes.some(() => true); // Size matching logic

    return matchesCategory && matchesSearch && matchesPrice && matchesSize;
  });

  // Apply sorting
  if (selectedSort === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (selectedSort === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (selectedSort === "name-az") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  } else if (selectedSort === "name-za") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      b.name.localeCompare(a.name),
    );
  }

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
        <TouchableOpacity
          style={styles.filterButton}
          onPress={openFilterModal}
          activeOpacity={0.8}
        >
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
                onPress={() => router.push(`/product/${item.id}`)}
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
                    onPress={() => toggleFavorite(item.id)}
                  >
                    <Ionicons
                      name={
                        favorites.includes(item.id) ? "heart" : "heart-outline"
                      }
                      size={20}
                      color={
                        favorites.includes(item.id) ? "#FF0000" : "#1A1A1A"
                      }
                    />
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

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.filterModal}>
            {/* Modal Header */}
            <View style={styles.filterHeader}>
              <Text style={styles.filterTitle}>Filter</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {/* Scrollable Filter Content */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              style={styles.filterScrollView}
            >
              {/* Page 1: Price Range */}
              <View style={styles.filterPage}>
                <Text style={styles.filterSectionTitle}>Price Range</Text>
                <View style={styles.priceRangeContainer}>
                  <View style={styles.priceLabels}>
                    <Text style={styles.priceLabel}>${tempPriceRange[0]}</Text>
                    <Text style={styles.priceLabel}>${tempPriceRange[1]}</Text>
                  </View>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={200}
                    step={10}
                    value={tempPriceRange[0]}
                    onValueChange={(value) =>
                      setTempPriceRange([value, tempPriceRange[1]])
                    }
                    minimumTrackTintColor="#1A1A1A"
                    maximumTrackTintColor="#E6E6E6"
                    thumbTintColor="#1A1A1A"
                  />
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={200}
                    step={10}
                    value={tempPriceRange[1]}
                    onValueChange={(value) =>
                      setTempPriceRange([tempPriceRange[0], value])
                    }
                    minimumTrackTintColor="#1A1A1A"
                    maximumTrackTintColor="#E6E6E6"
                    thumbTintColor="#1A1A1A"
                  />
                </View>

                {/* Size Filter */}
                <Text style={styles.filterSectionTitle}>Size</Text>
                <View style={styles.sizesGrid}>
                  {sizes.map((size) => (
                    <TouchableOpacity
                      key={size}
                      style={[
                        styles.sizeChip,
                        tempSelectedSizes.includes(size) &&
                          styles.sizeChipActive,
                      ]}
                      onPress={() => toggleSize(size)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.sizeText,
                          tempSelectedSizes.includes(size) &&
                            styles.sizeTextActive,
                        ]}
                      >
                        {size}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Page 2: Sort Options */}
              <View style={styles.filterPage}>
                <Text style={styles.filterSectionTitle}>Sort By</Text>
                <View style={styles.sortOptions}>
                  {sortOptions.map((option) => (
                    <TouchableOpacity
                      key={option.id}
                      style={[
                        styles.sortOption,
                        tempSelectedSort === option.id &&
                          styles.sortOptionActive,
                      ]}
                      onPress={() => setTempSelectedSort(option.id)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.sortOptionText,
                          tempSelectedSort === option.id &&
                            styles.sortOptionTextActive,
                        ]}
                      >
                        {option.label}
                      </Text>
                      {tempSelectedSort === option.id && (
                        <Ionicons name="checkmark" size={20} color="#1A1A1A" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            {/* Page Indicator */}
            <View style={styles.pageIndicator}>
              <View style={styles.pageIndicatorDot} />
              <View
                style={[
                  styles.pageIndicatorDot,
                  styles.pageIndicatorDotInactive,
                ]}
              />
            </View>

            {/* Action Buttons */}
            <View style={styles.filterActions}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={resetFilters}
                activeOpacity={0.8}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={applyFilters}
                activeOpacity={0.8}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  // Filter Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  filterModal: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 20,
    maxHeight: "80%",
  },
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  filterTitle: {
    fontSize: 24,
    fontFamily: "OpenSans_700Bold",
    color: "#1A1A1A",
  },
  filterScrollView: {
    flex: 1,
  },
  filterPage: {
    width: 380, // Approximate screen width
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  filterSectionTitle: {
    fontSize: 18,
    fontFamily: "OpenSans_600SemiBold",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  priceRangeContainer: {
    marginBottom: 32,
  },
  priceLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: "#1A1A1A",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sizesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  sizeChip: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    backgroundColor: "#ffffff",
  },
  sizeChipActive: {
    backgroundColor: "#1A1A1A",
    borderColor: "#1A1A1A",
  },
  sizeText: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: "#1A1A1A",
  },
  sizeTextActive: {
    color: "#ffffff",
  },
  sortOptions: {
    gap: 12,
  },
  sortOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    backgroundColor: "#ffffff",
  },
  sortOptionActive: {
    backgroundColor: "#F5F5F5",
    borderColor: "#1A1A1A",
  },
  sortOptionText: {
    fontSize: 16,
    fontFamily: "OpenSans_500Medium",
    color: "#1A1A1A",
  },
  sortOptionTextActive: {
    fontFamily: "OpenSans_600SemiBold",
  },
  pageIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
  },
  pageIndicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#1A1A1A",
  },
  pageIndicatorDotInactive: {
    backgroundColor: "#E6E6E6",
  },
  filterActions: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  resetButtonText: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: "#1A1A1A",
  },
  applyButton: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 10,
    backgroundColor: "#1A1A1A",
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: "#ffffff",
  },
});
