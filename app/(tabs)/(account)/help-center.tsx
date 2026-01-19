import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const contactMethods = [
  {
    id: 1,
    name: "WhatsApp",
    icon: "whatsapp",
    iconType: "brand",
    color: "#25D366",
    description: "Chat with us on WhatsApp",
    url: "https://wa.me/1234567890",
    type: "external",
  },
  {
    id: 2,
    name: "Instagram",
    icon: "instagram",
    iconType: "brand",
    color: "#E4405F",
    description: "Message us on Instagram",
    url: "https://instagram.com/yourstore",
    type: "external",
  },
  {
    id: 3,
    name: "Facebook",
    icon: "facebook",
    iconType: "brand",
    color: "#1877F2",
    description: "Contact us on Facebook",
    url: "https://facebook.com/yourstore",
    type: "external",
  },
  {
    id: 4,
    name: "Email",
    icon: "envelope",
    iconType: "solid",
    color: "#EA4335",
    description: "Send us an email",
    url: "mailto:support@yourstore.com",
    type: "external",
  },
  {
    id: 5,
    name: "Phone",
    icon: "phone",
    iconType: "solid",
    color: "#34A853",
    description: "Call our support team",
    url: "tel:+1234567890",
    type: "external",
  },
  {
    id: 6,
    name: "Twitter",
    icon: "twitter",
    iconType: "brand",
    color: "#1DA1F2",
    description: "Tweet us your questions",
    url: "https://twitter.com/yourstore",
    type: "external",
  },
  {
    id: 7,
    name: "Customer Service",
    icon: "comments",
    iconType: "solid",
    color: "#9C27B0",
    description: "Chat with our customer service",
    url: "/customer-service",
    type: "internal",
  },
];

export default function HelpCenter() {
  const handleContactPress = (url: string, type: string) => {
    if (type === "internal") {
      router.push(url as any);
    } else {
      Linking.openURL(url).catch((err) =>
        console.error("Failed to open URL:", err),
      );
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Center</Text>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/(home)/notifications")}
        >
          <FontAwesome5 name="bell" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.iconContainer}>
            <FontAwesome6 name="headset" size={48} color="#1A1A1A" />
          </View>
          <Text style={styles.title}>How can we help you?</Text>
          <Text style={styles.subtitle}>
            Choose your preferred way to reach out to our support team
          </Text>
        </View>

        {/* Contact Methods */}
        <View style={styles.contactGrid}>
          {contactMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={styles.contactCard}
              onPress={() => handleContactPress(method.url, method.type)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.contactIcon,
                  { backgroundColor: `${method.color}15` },
                ]}
              >
                <FontAwesome5
                  name={method.icon}
                  size={24}
                  color={method.color}
                  solid={method.iconType === "solid"}
                />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{method.name}</Text>
                <Text style={styles.contactDescription}>
                  {method.description}
                </Text>
              </View>
              <Feather name="chevron-right" size={20} color="#808080" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Additional Info */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <FontAwesome6 name="clock" size={20} color="#1A1A1A" />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Working Hours</Text>
              <Text style={styles.infoDescription}>
                Monday - Friday: 9:00 AM - 6:00 PM{"\n"}
                Saturday: 10:00 AM - 4:00 PM{"\n"}
                Sunday: Closed
              </Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <FontAwesome6 name="location-dot" size={20} color="#1A1A1A" />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Visit Us</Text>
              <Text style={styles.infoDescription}>
                123 Fashion Street{"\n"}
                New York, NY 10001{"\n"}
                United States
              </Text>
            </View>
          </View>
        </View>

        {/* FAQ Button */}
        <TouchableOpacity
          style={styles.faqButton}
          onPress={() => router.push("/(tabs)/(account)/faqs")}
          activeOpacity={0.8}
        >
          <FontAwesome6 name="circle-question" size={20} color="#1A1A1A" />
          <Text style={styles.faqButtonText}>
            View Frequently Asked Questions
          </Text>
          <Feather name="arrow-right" size={20} color="#1A1A1A" />
        </TouchableOpacity>
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
    letterSpacing: -2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerSection: {
    alignItems: "center",
    paddingVertical: 32,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: "OpenSans_700Bold",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
    color: "#808080",
    textAlign: "center",
    lineHeight: 24,
  },
  contactGrid: {
    marginBottom: 24,
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  contactDescription: {
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    color: "#808080",
  },
  infoSection: {
    gap: 16,
    marginBottom: 24,
  },
  infoCard: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    gap: 12,
  },
  infoText: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    color: "#808080",
    lineHeight: 20,
  },
  faqButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    gap: 12,
  },
  faqButtonText: {
    flex: 1,
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: "#1A1A1A",
  },
});
