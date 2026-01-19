import { account } from "@/app/dummyData";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
  const handleNavigation = (itemName: string) => {
    // Use switch case or if-else for type-safe routing
    switch (itemName) {
      case "My orders":
        router.push("/(tabs)/(account)/orders");
        break;
      case "My Details":
        router.push("/(tabs)/(account)/details");
        break;
      case "Address Book":
        router.push("/(tabs)/(account)/address-book");
        break;
      case "Payment Method":
        router.push("/(tabs)/(account)/payment-method");
        break;
      case "Notifications":
        router.push("/(tabs)/(account)/notifications");
        break;
      case "FAQS":
        router.push("/(tabs)/(account)/faqs");
        break;
      case "Help Center":
        router.push("/(tabs)/(account)/help-center");
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Account</Text>
        </View>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome5 name="bell" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {account.map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.name}</Text>
              <View style={styles.sectionContent}>
                {section.acc.map((item, itemIndex) => (
                  <TouchableOpacity
                    key={itemIndex}
                    style={[
                      styles.menuItem,
                      itemIndex === section.acc.length - 1 &&
                        styles.menuItemLast,
                    ]}
                    activeOpacity={0.7}
                    onPress={() => handleNavigation(item.name)}
                  >
                    <View style={styles.menuLeft}>
                      <View style={styles.iconContainer}>
                        <FontAwesome6
                          name={item.icon}
                          size={18}
                          color={item.iconColor}
                        />
                      </View>
                      <Text style={styles.menuText}>{item.name}</Text>
                    </View>
                    <AntDesign name="right" size={16} color="#808080" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          {/* Logout Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.8}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
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
    paddingBottom: 40,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "OpenSans_600SemiBold",
    color: "#808080",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  menuText: {
    fontSize: 16,
    fontFamily: "OpenSans_500Medium",
    color: "#1A1A1A",
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: "#ffffff",
  },
});
