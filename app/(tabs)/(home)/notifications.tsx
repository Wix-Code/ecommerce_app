import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import Ionicons from "@expo/vector-icons/Ionicons";
import { notifications } from "@/app/dummyData";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function Notifications() {
  const hasNotifications = notifications && notifications.length > 0;

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {hasNotifications ? (
        // Notifications List
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.notificationsContainer}>
            {notifications.map((noti, index) => (
              <View key={index} style={styles.timeSection}>
                <Text style={styles.time}>{noti.time}</Text>
                {noti.notify.map((note, noteIndex) => (
                  <TouchableOpacity 
                    key={noteIndex} 
                    style={styles.notificationCard}
                    activeOpacity={0.7}
                  >
                    <View style={styles.iconContainer}>
                      <FontAwesome6 
                        name={note.icon} 
                        size={20} 
                        color={note.iconColor} 
                      />
                    </View>
                    <View style={styles.notificationContent}>
                      <Text style={styles.notificationTitle}>{note.title}</Text>
                      <Text style={styles.notificationMessage}>{note.note}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        // Empty State
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <Ionicons name="notifications-outline" size={64} color="#E6E6E6" />
          </View>
          <Text style={styles.emptyTitle}>
            You haven't gotten any{"\n"}notifications yet!
          </Text>
          <Text style={styles.emptyMessage}>
            We'll alert you when something{"\n"}cool happens.
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
  notificationsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  timeSection: {
    marginBottom: 24,
  },
  time: {
    color: "#1A1A1A",
    fontSize: 14,
    marginBottom: 12,
    fontFamily: "OpenSans_600SemiBold",
  },
  notificationCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    marginBottom: 8,
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  notificationContent: {
    flex: 1,
    gap: 4,
  },
  notificationTitle: {
    color: "#1A1A1A",
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
  },
  notificationMessage: {
    color: "#808080",
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    lineHeight: 20,
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
    lineHeight: 28,
  },
  emptyMessage: {
    color: "#808080",
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
    textAlign: "center",
    lineHeight: 24,
  },
});