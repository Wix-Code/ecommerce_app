import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Index() {
  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      {/* MAIN CONTENT */}
      <View style={styles.container}>
        <View style={{paddingHorizontal: 20}}>
          <Text style={styles.header}>
            Define{"\n"}yourself in{"\n"}your unique{"\n"}way.
          </Text>
        </View>

        <View style={styles.image}>
          <Image source={require("../assets/images/s.png")} />
          <View style={styles.top}>
            <Image source={require("../assets/images/img.png")} />
          </View>
        </View>
      </View>

      {/* FIXED BOTTOM BUTTON */}
      <View style={styles.bottom}>
        <Link href="/login" asChild>
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.link}>
              Get Started{" "}
              <FontAwesome6 name="arrow-right" size={20} color="white" />
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  container: {
    flex: 1,
    paddingTop: 24,
    position: "relative",
    zIndex: 1,
  },

  header: {
    color: "#1A1A1A",
    fontSize: 64,
    lineHeight: 54,
    //zIndex: 50,
    letterSpacing: -5,
    fontFamily: "OpenSans_700Bold",
    marginBottom: 24,
  },

  image: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: 150,
    zIndex: 0,
  },

  top: {
    position: "absolute",
    top: -90,
  },

  bottom: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    backgroundColor: "#ffffff",
    zIndex: 10,
  },

  button: {
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center"
  },

  link: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "OpenSans_500Medium",
  },
});