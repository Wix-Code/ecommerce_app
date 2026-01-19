import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const messages = [
  {
    id: 1,
    text: "Hello! How can I help you today?",
    sender: "agent",
    time: "10:30 AM",
  },
];

export default function CustomerService() {
  const [messageText, setMessageText] = useState("");
  const [chatMessages, setChatMessages] = useState(messages);

  const handleSend = () => {
    if (messageText.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        text: messageText,
        sender: "user",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setChatMessages([...chatMessages, newMessage]);
      setMessageText("");

      // Simulate agent response
      setTimeout(() => {
        const agentResponse = {
          id: chatMessages.length + 2,
          text: "Thank you for your message. Our team will assist you shortly.",
          sender: "agent",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setChatMessages((prev) => [...prev, agentResponse]);
      }, 1000);
    }
  };

  const handleVoiceMessage = () => {
    Alert.alert(
      "Voice Message",
      "Voice recording feature will be available soon!",
      [{ text: "OK" }],
    );
  };

  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const newMessage = {
          id: chatMessages.length + 1,
          text: "📷 Image sent",
          sender: "user",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setChatMessages([...chatMessages, newMessage]);

        // Simulate agent response
        setTimeout(() => {
          const agentResponse = {
            id: chatMessages.length + 2,
            text: "Thank you for sending the image. Let me review it.",
            sender: "agent",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          setChatMessages((prev) => [...prev, agentResponse]);
        }, 1000);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Customer Service</Text>
          <Text style={styles.headerStatus}>● Online</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {chatMessages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageWrapper,
                message.sender === "user"
                  ? styles.userMessageWrapper
                  : styles.agentMessageWrapper,
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  message.sender === "user"
                    ? styles.userMessage
                    : styles.agentMessage,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    message.sender === "user" && styles.userMessageText,
                  ]}
                >
                  {message.text}
                </Text>
              </View>
              <Text
                style={[
                  styles.messageTime,
                  message.sender === "user" && styles.userMessageTime,
                ]}
              >
                {message.time}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.attachButton}
            onPress={handleImagePicker}
          >
            <Ionicons name="image-outline" size={26} color="#808080" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={messageText}
            onChangeText={setMessageText}
            placeholderTextColor="#808080"
            multiline
          />
          {messageText.trim() ? (
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Ionicons name="send" size={20} color="#ffffff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.micButton}
              onPress={handleVoiceMessage}
            >
              <MaterialIcons name="keyboard-voice" size={24} color="#1A1A1A" />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
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
  headerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "OpenSans_600SemiBold",
    color: "#1A1A1A",
  },
  headerStatus: {
    fontSize: 12,
    fontFamily: "OpenSans_400Regular",
    color: "#4CAF50",
    marginTop: 2,
  },
  container: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    paddingBottom: 10,
  },
  messageWrapper: {
    marginBottom: 16,
    maxWidth: "75%",
  },
  agentMessageWrapper: {
    alignSelf: "flex-start",
  },
  userMessageWrapper: {
    alignSelf: "flex-end",
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 4,
  },
  agentMessage: {
    backgroundColor: "#F5F5F5",
    borderBottomLeftRadius: 0,
  },
  userMessage: {
    backgroundColor: "#1A1A1A",
    borderBottomRightRadius: 0,
  },
  messageText: {
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
    color: "#1A1A1A",
    lineHeight: 22,
  },
  userMessageText: {
    color: "#ffffff",
  },
  messageTime: {
    fontSize: 11,
    fontFamily: "OpenSans_400Regular",
    color: "#808080",
  },
  userMessageTime: {
    color: "#808080",
    textAlign: "right",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
    backgroundColor: "#ffffff",
    gap: 12,
  },
  attachButton: {
    paddingBottom: 8,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
    color: "#1A1A1A",
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
  },
  micButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
});
