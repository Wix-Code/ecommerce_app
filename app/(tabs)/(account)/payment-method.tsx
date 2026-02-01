import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const savedCards = [
  { id: 1, type: "visa", last4: "5421", selected: true },
  { id: 2, type: "mastercard", last4: "8923", selected: false },
];

export default function PaymentMethod() {
  const [cards, setCards] = useState(savedCards);
  const [showAddCard, setShowAddCard] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const selectCard = (id: number) => {
    setCards(
      cards.map((card) => ({
        ...card,
        selected: card.id === id,
      })),
    );
  };

  const handleAddCard = () => {
    if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
      Alert.alert("Error", "Please fill in all card details");
      return;
    }

    // Show success modal
    setShowSuccessModal(true);

    // Reset form
    setCardNumber("");
    setCardHolder("");
    setExpiryDate("");
    setCvv("");
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setShowAddCard(false);
  };

  const handleApply = () => {
    const selectedCard = cards.find((card) => card.selected);
    if (selectedCard) {
      Alert.alert(
        "Success",
        `Card ending in ${selectedCard.last4} applied successfully!`,
      );
      router.back();
    }
  };

  const isFormValid =
    cardNumber.length >= 16 &&
    cardHolder.length > 0 &&
    expiryDate.length === 5 &&
    cvv.length === 3;

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(" ") : cleaned;
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {showAddCard ? "New Card" : "Payment Method"}
        </Text>
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
        {!showAddCard ? (
          <>
            {/* Saved Cards */}
            <Text style={styles.sectionTitle}>Saved cards</Text>

            {cards.map((card) => (
              <TouchableOpacity
                key={card.id}
                style={styles.cardContainer}
                onPress={() => selectCard(card.id)}
                activeOpacity={0.7}
              >
                <View style={styles.cardInfo}>
                  <Fontisto
                    name={card.type}
                    size={32}
                    color={card.type === "visa" ? "#1A1F71" : "#EB001B"}
                  />
                  <Text style={styles.cardNumber}>
                    **** **** **** {card.last4}
                  </Text>
                </View>
                <View
                  style={[
                    styles.radioOuter,
                    card.selected && styles.radioOuterSelected,
                  ]}
                >
                  {card.selected && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            ))}

            {/* Add New Card Button */}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddCard(true)}
              activeOpacity={0.7}
            >
              <AntDesign name="plus" size={20} color="#1A1A1A" />
              <Text style={styles.addButtonText}>Add New Card</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* Add Card Form */}
            <Text style={styles.sectionTitle}>Add Debit or Credit Card</Text>

            {/* Card Holder Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Card holder name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter card holder name"
                placeholderTextColor="#CCCCCC"
                value={cardHolder}
                onChangeText={setCardHolder}
              />
            </View>

            {/* Card Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Card number</Text>
              <TextInput
                style={styles.input}
                placeholder="1234 5678 9012 3456"
                placeholderTextColor="#CCCCCC"
                value={formatCardNumber(cardNumber)}
                onChangeText={(text) => setCardNumber(text.replace(/\s/g, ""))}
                keyboardType="number-pad"
                maxLength={19}
              />
            </View>

            {/* Expiry Date and CVV */}
            <View style={styles.rowInputs}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Expiry date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  placeholderTextColor="#CCCCCC"
                  value={expiryDate}
                  onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                  keyboardType="number-pad"
                  maxLength={5}
                />
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Security code</Text>
                <TextInput
                  style={styles.input}
                  placeholder="CVV"
                  placeholderTextColor="#CCCCCC"
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="number-pad"
                  maxLength={3}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  !isFormValid && styles.submitButtonDisabled,
                ]}
                onPress={handleAddCard}
                disabled={!isFormValid}
                activeOpacity={0.8}
              >
                <Text style={styles.submitButtonText}>Add Card</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddCard(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>

      {/* Fixed Apply Button - Only show when viewing saved cards */}
      {!showAddCard && (
        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={handleApply}
            activeOpacity={0.8}
          >
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.successIcon}>
              <AntDesign name="check-circle" size={64} color="#4CAF50" />
            </View>
            <Text style={styles.congratsTitle}>Congratulations!</Text>
            <Text style={styles.congratsMessage}>
              Your new card has been added successfully.
            </Text>
            <TouchableOpacity
              style={styles.thanksButton}
              onPress={handleCloseModal}
              activeOpacity={0.8}
            >
              <Text style={styles.thanksButtonText}>Thanks</Text>
            </TouchableOpacity>
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
    fontSize: 24,
    fontFamily: "OpenSans_700Bold",
    color: "#1A1A1A",
    letterSpacing: -1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 100, // Add padding to prevent content being hidden behind button
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    backgroundColor: "#FAFAFA",
    marginBottom: 12,
  },
  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  cardNumber: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: "#1A1A1A",
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E6E6E6",
    justifyContent: "center",
    alignItems: "center",
  },
  radioOuterSelected: {
    borderColor: "#1A1A1A",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#1A1A1A",
  },
  addButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    gap: 8,
    marginTop: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: "#1A1A1A",
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: "OpenSans_600SemiBold",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
    color: "#1A1A1A",
    backgroundColor: "#ffffff",
  },
  rowInputs: {
    flexDirection: "row",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  buttonGroup: {
    marginTop: 24,
    gap: 12,
  },
  submitButton: {
    backgroundColor: "#1A1A1A",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#CCCCCC",
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: "#ffffff",
  },
  cancelButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: "#1A1A1A",
  },
  // Fixed Apply Button
  fixedButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  applyButton: {
    backgroundColor: "#1A1A1A",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: "#ffffff",
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(25, 25, 25, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  successIcon: {
    marginBottom: 24,
  },
  congratsTitle: {
    fontSize: 24,
    fontFamily: "OpenSans_700Bold",
    color: "#1A1A1A",
    marginBottom: 12,
    textAlign: "center",
  },
  congratsMessage: {
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
    color: "#808080",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  thanksButton: {
    backgroundColor: "#1A1A1A",
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  thanksButtonText: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: "#ffffff",
  },
});
