import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
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
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const savedAddresses = [
  {
    id: 1,
    type: "home",
    name: "Home",
    address: "2551 Vista Dr #B301, Juneau, Alaska 99801, USA",
    latitude: 58.3019,
    longitude: -134.4197,
    selected: true,
  },
  {
    id: 2,
    type: "briefcase",
    name: "Work",
    address: "123 Office Plaza, Juneau, Alaska 99801, USA",
    latitude: 58.305,
    longitude: -134.41,
    selected: false,
  },
  {
    id: 3,
    type: "location-dot",
    name: "Other",
    address: "456 Main Street, Juneau, Alaska 99801, USA",
    latitude: 58.3,
    longitude: -134.425,
    selected: false,
  },
];

export default function AddressPage() {
  const [addresses, setAddresses] = useState(savedAddresses);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Form state
  const [addressName, setAddressName] = useState("");
  const [addressType, setAddressType] = useState<
    "home" | "briefcase" | "location-dot"
  >("home");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

  // Map state
  const [region, setRegion] = useState({
    latitude: 58.3019,
    longitude: -134.4197,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 58.3019,
    longitude: -134.4197,
  });

  const selectAddress = (id: number) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        selected: address.id === id,
      })),
    );
  };

  const handleAddAddress = () => {
    if (!addressName || !streetAddress || !city || !state || !zipCode) {
      Alert.alert("Error", "Please fill in all address details");
      return;
    }

    const newAddress = {
      id: addresses.length + 1,
      type: addressType,
      name: addressName,
      address: `${streetAddress}, ${city}, ${state} ${zipCode}${country ? ", " + country : ""}`,
      latitude: markerCoordinate.latitude,
      longitude: markerCoordinate.longitude,
      selected: false,
    };

    setAddresses([...addresses, newAddress]);
    setShowSuccessModal(true);

    // Reset form
    resetForm();
  };

  const resetForm = () => {
    setAddressName("");
    setAddressType("home");
    setStreetAddress("");
    setCity("");
    setState("");
    setZipCode("");
    setCountry("");
    setMarkerCoordinate({
      latitude: 58.3019,
      longitude: -134.4197,
    });
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setShowAddAddress(false);
  };

  const handleApply = () => {
    const selectedAddress = addresses.find((address) => address.selected);
    if (selectedAddress) {
      Alert.alert(
        "Success",
        `Address "${selectedAddress.name}" applied successfully!`,
      );
      router.back();
    }
  };

  const handleMapPress = (event: any) => {
    const { coordinate } = event.nativeEvent;
    setMarkerCoordinate(coordinate);
  };

  const isFormValid =
    addressName.length > 0 &&
    streetAddress.length > 0 &&
    city.length > 0 &&
    state.length > 0 &&
    zipCode.length > 0;

  const getAddressIcon = (type: string) => {
    switch (type) {
      case "home":
        return "home";
      case "briefcase":
        return "briefcase";
      default:
        return "location-dot";
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {showAddAddress ? "New Address" : "Address"}
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
        {!showAddAddress ? (
          <>
            {/* Saved Addresses */}
            <Text style={styles.sectionTitle}>Saved Addresses</Text>

            {addresses.map((address) => (
              <TouchableOpacity
                key={address.id}
                style={styles.addressContainer}
                onPress={() => selectAddress(address.id)}
                activeOpacity={0.7}
              >
                <View style={styles.addressInfo}>
                  <FontAwesome6
                    name={getAddressIcon(address.type)}
                    size={24}
                    color="#1A1A1A"
                  />
                  <View style={styles.addressTextContainer}>
                    <Text style={styles.addressName}>{address.name}</Text>
                    <Text style={styles.addressText} numberOfLines={2}>
                      {address.address}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.radioOuter,
                    address.selected && styles.radioOuterSelected,
                  ]}
                >
                  {address.selected && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            ))}

            {/* Add New Address Button */}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddAddress(true)}
              activeOpacity={0.7}
            >
              <AntDesign name="plus" size={20} color="#1A1A1A" />
              <Text style={styles.addButtonText}>Add New Address</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* Add Address Form */}
            <Text style={styles.sectionTitle}>Add New Address</Text>

            {/* Map View */}
            <View style={styles.mapContainer}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
                onRegionChangeComplete={setRegion}
                onPress={handleMapPress}
              >
                <Marker coordinate={markerCoordinate} draggable />
              </MapView>
              <Text style={styles.mapHint}>
                Tap on the map or drag the marker to set your location
              </Text>
            </View>

            {/* Address Type Selection */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Address Type</Text>
              <View style={styles.typeSelector}>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    addressType === "home" && styles.typeButtonActive,
                  ]}
                  onPress={() => setAddressType("home")}
                  activeOpacity={0.7}
                >
                  <FontAwesome6
                    name="home"
                    size={20}
                    color={addressType === "home" ? "#ffffff" : "#1A1A1A"}
                  />
                  <Text
                    style={[
                      styles.typeButtonText,
                      addressType === "home" && styles.typeButtonTextActive,
                    ]}
                  >
                    Home
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    addressType === "briefcase" && styles.typeButtonActive,
                  ]}
                  onPress={() => setAddressType("briefcase")}
                  activeOpacity={0.7}
                >
                  <FontAwesome6
                    name="briefcase"
                    size={20}
                    color={addressType === "briefcase" ? "#ffffff" : "#1A1A1A"}
                  />
                  <Text
                    style={[
                      styles.typeButtonText,
                      addressType === "briefcase" &&
                        styles.typeButtonTextActive,
                    ]}
                  >
                    Work
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    addressType === "location-dot" && styles.typeButtonActive,
                  ]}
                  onPress={() => setAddressType("location-dot")}
                  activeOpacity={0.7}
                >
                  <FontAwesome6
                    name="location-dot"
                    size={20}
                    color={
                      addressType === "location-dot" ? "#ffffff" : "#1A1A1A"
                    }
                  />
                  <Text
                    style={[
                      styles.typeButtonText,
                      addressType === "location-dot" &&
                        styles.typeButtonTextActive,
                    ]}
                  >
                    Other
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Address Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Address Name/Label</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Home, Office, Mom's House"
                placeholderTextColor="#CCCCCC"
                value={addressName}
                onChangeText={setAddressName}
              />
            </View>

            {/* Street Address */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Street Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter street address"
                placeholderTextColor="#CCCCCC"
                value={streetAddress}
                onChangeText={setStreetAddress}
              />
            </View>

            {/* City and State */}
            <View style={styles.rowInputs}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>City</Text>
                <TextInput
                  style={styles.input}
                  placeholder="City"
                  placeholderTextColor="#CCCCCC"
                  value={city}
                  onChangeText={setCity}
                />
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>State</Text>
                <TextInput
                  style={styles.input}
                  placeholder="State"
                  placeholderTextColor="#CCCCCC"
                  value={state}
                  onChangeText={setState}
                />
              </View>
            </View>

            {/* Zip Code and Country */}
            <View style={styles.rowInputs}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Zip Code</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Zip Code"
                  placeholderTextColor="#CCCCCC"
                  value={zipCode}
                  onChangeText={setZipCode}
                  keyboardType="number-pad"
                />
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Country (Optional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Country"
                  placeholderTextColor="#CCCCCC"
                  value={country}
                  onChangeText={setCountry}
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
                onPress={handleAddAddress}
                disabled={!isFormValid}
                activeOpacity={0.8}
              >
                <Text style={styles.submitButtonText}>Add Address</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setShowAddAddress(false);
                  resetForm();
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>

      {/* Fixed Apply Button - Only show when viewing saved addresses */}
      {!showAddAddress && (
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
            <Text style={styles.congratsTitle}>Success!</Text>
            <Text style={styles.congratsMessage}>
              Your new address has been added successfully.
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
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  addressContainer: {
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
  addressInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  addressTextContainer: {
    flex: 1,
  },
  addressName: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    color: "#808080",
    lineHeight: 20,
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
  mapContainer: {
    marginBottom: 20,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
  },
  mapHint: {
    fontSize: 12,
    fontFamily: "OpenSans_400Regular",
    color: "#808080",
    textAlign: "center",
    marginTop: 8,
  },
  typeSelector: {
    flexDirection: "row",
    gap: 8,
  },
  typeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    backgroundColor: "#FAFAFA",
    gap: 6,
  },
  typeButtonActive: {
    backgroundColor: "#1A1A1A",
    borderColor: "#1A1A1A",
  },
  typeButtonText: {
    fontSize: 14,
    fontFamily: "OpenSans_600SemiBold",
    color: "#1A1A1A",
  },
  typeButtonTextActive: {
    color: "#ffffff",
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
