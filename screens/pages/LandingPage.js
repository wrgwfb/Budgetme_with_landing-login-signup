import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // for the check icons
import LandingPagelogo from "../../assets/landingpagelogo.png";  
const LandingPage = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Main"); // Navigate to your Home/Main screen
  };

  return (
    <View style={styles.container}>
      <Image source={LandingPagelogo} style={styles.logo} resizeMode="contain" />
  
      <Text style={styles.subtitle}>
        Your Smart Personal Budget AI Tracker App
      </Text>

      <View style={styles.featuresList}>
        {[
          "Smart Goal Tracking",
          "Subscription Management",
          "Finance Companion",
          "AI-Powered Budgeting",
          "Achievements & More!",
        ].map((feature, index) => (
          <View style={styles.featureItem} key={index}>
            <Ionicons name="checkmark-circle" size={20} color="#054396" />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.buttonstarted} onPress={() => navigation.navigate("LoginPage")}>
        <Text style={styles.buttonText}>Get Started</Text>
        <Ionicons name="arrow-forward" size={18} color="#fff" style={{ marginLeft: 8 }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 110,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#054396",
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "500",
    color: "#333",
    marginBottom: 25,
  },
  featuresList: {
    width: "100%",
    marginBottom: 40,
    alignItems: "center",
    paddingTop: 60,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  buttonstarted: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#054396",
    paddingVertical: 12,
    paddingHorizontal: 110,
    borderRadius: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default LandingPage;

