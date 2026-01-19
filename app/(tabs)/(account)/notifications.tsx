import { buttons } from "@/app/dummyData";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationSettings() {
  // Track toggle state for each notification type
  const [toggleStates, setToggleStates] = useState<{ [key: number]: boolean }>(
    buttons.reduce((acc, button) => ({ ...acc, [button.id]: true }), {}),
  );

  const handleToggle = (id: number) => {
    setToggleStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome5 name="bell" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.settingsList}>
          {buttons.map((button) => {
            const isActive = toggleStates[button.id];
            return (
              <View key={button.id} style={styles.settingItem}>
                <Text style={styles.settingName}>{button.name}</Text>
                <TouchableOpacity
                  onPress={() => handleToggle(button.id)}
                  style={[
                    styles.toggleContainer,
                    isActive ? styles.toggleActive : styles.toggleInactive,
                  ]}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.toggleCircle,
                      isActive
                        ? styles.toggleCircleActive
                        : styles.toggleCircleInactive,
                    ]}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
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
    fontSize: 18,
    fontFamily: "OpenSans_600SemiBold",
    color: "#1A1A1A",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  settingsList: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  settingName: {
    color: "#1A1A1A",
    fontSize: 16,
    fontFamily: "OpenSans_500Medium",
    flex: 1,
  },
  toggleContainer: {
    width: 48,
    height: 24,
    borderRadius: 14,
    padding: 2,
    justifyContent: "center",
  },
  toggleActive: {
    backgroundColor: "#1A1A1A",
  },
  toggleInactive: {
    backgroundColor: "#E6E6E6",
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 12,
    backgroundColor: "#ffffff",
  },
  toggleCircleActive: {
    alignSelf: "flex-end",
  },
  toggleCircleInactive: {
    alignSelf: "flex-start",
  },
});
