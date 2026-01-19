import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useState } from "react";
import {
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
  { id: "general", name: "General" },
  { id: "account", name: "Account" },
  { id: "orders", name: "Orders" },
  { id: "payment", name: "Payment" },
  { id: "shipping", name: "Shipping" },
];

const faqs = [
  {
    id: 1,
    category: "general",
    question: "How do I browse products?",
    answer:
      'To browse products, simply navigate to the "Shop" section of the app. You can explore different categories, use the search bar, or apply filters to find specific items.',
  },
  {
    id: 2,
    category: "general",
    question: "How do I make a purchase?",
    answer:
      'When you find a product you want to purchase, tap on it to view the product details. Check the price, description, and available options (if applicable), and then tap the "Add to Cart" button. Follow the on-screen instructions to complete the purchase, including providing shipping details and payment information.',
  },
  {
    id: 3,
    category: "account",
    question: "How do I create an account?",
    answer:
      'To create an account, tap on the "Sign Up" button on the login screen. Fill in your details including name, email, and password, then tap "Create Account".',
  },
  {
    id: 4,
    category: "account",
    question: "How do I reset my password?",
    answer:
      'On the login screen, tap "Forgot Password?". Enter your email address and we\'ll send you a verification code to reset your password.',
  },
  {
    id: 5,
    category: "orders",
    question: "How do I track my order?",
    answer:
      'Go to "My Orders" in your account section. Select the order you want to track and tap "Track Order" to see real-time updates on your delivery.',
  },
  {
    id: 6,
    category: "orders",
    question: "Can I cancel my order?",
    answer:
      "You can cancel your order within 24 hours of placing it. Go to your order details and tap the cancel button. Orders already in transit cannot be cancelled.",
  },
  {
    id: 7,
    category: "payment",
    question: "What payment methods do you accept?",
    answer:
      "We accept credit cards, debit cards, PayPal, and various mobile payment options. All payments are processed securely.",
  },
  {
    id: 8,
    category: "shipping",
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 5-7 business days. Express shipping is available and takes 2-3 business days. International shipping varies by location.",
  },
];

export default function FAQs() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Filter FAQs based on category and search
  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpanded = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQs</Text>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/(home)/notifications")}
        >
          <FontAwesome5 name="bell" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
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

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#808080" />
          <TextInput
            placeholder="Search FAQs..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#808080"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#808080" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* FAQs List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <TouchableOpacity
                key={faq.id}
                style={styles.faqCard}
                onPress={() => toggleExpanded(faq.id)}
                activeOpacity={0.7}
              >
                <View style={styles.faqHeader}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <Entypo
                    name={isExpanded ? "chevron-thin-up" : "chevron-thin-down"}
                    size={20}
                    color="#1A1A1A"
                  />
                </View>
                {isExpanded && (
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                )}
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="help-circle-outline" size={64} color="#E6E6E6" />
            <Text style={styles.emptyTitle}>No FAQs Found</Text>
            <Text style={styles.emptyMessage}>
              Try adjusting your search or filters.
            </Text>
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
  categoriesWrapper: {
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
    color: "#1A1A1A",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  faqCard: {
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: "#1A1A1A",
  },
  faqAnswer: {
    marginTop: 12,
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    color: "#808080",
    lineHeight: 22,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: "OpenSans_600SemiBold",
    color: "#1A1A1A",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
    color: "#808080",
    textAlign: "center",
  },
});
