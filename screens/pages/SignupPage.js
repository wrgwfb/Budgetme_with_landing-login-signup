import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"
import Signuplogo from "../../assets/logoacc.png"; // Replace with your logo
import Googlelogo from "../../assets/googleLogo.png";

const SignUpPage = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // starts unchecked


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Image source={Signuplogo} style={styles.signuplogo} resizeMode="contain" />
      <Text style={styles.titleSignup}>Create an Account</Text>
      <Text style={styles.subtitleSignup}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      </Text>

      <Text style={styles.labelSignup}>Full name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Full name"
        value={fullName}
        onChangeText={setFullName}
      />

      <Text style={styles.labelSignup}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.labelSignup}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter your Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.optionsRow}>
      <TouchableOpacity
    style={styles.checkboxContainer}
    onPress={() => setRememberMe(!rememberMe)}
  >
    <Ionicons
      name={rememberMe ? "checkbox" : "checkbox-outline"}
      size={20}
      color="#130160"
    />
  </TouchableOpacity>
    <Text style={styles.rememberText}> Remember me</Text>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password ?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>SIGN UP</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or</Text>

      <TouchableOpacity style={styles.googleButton}>
        <Image source={Googlelogo} style={styles.googlelogo}/>
        <Text style={styles.googleText}>SIGN IN WITH GOOGLE</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Already have an account?
        <Text style={styles.signInLink} onPress={() => navigation.navigate("LoginPage")}>  Login</Text>
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 1,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  backButton: {
    marginBottom: 10,
    top: 54,
  },
  signuplogo: {
    bottom: -1,
    width: 140,
    height: 140,
    alignSelf: "center",
  },
  titleSignup: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    bottom: 30,
    color: "#000",
  },
  subtitleSignup: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
    marginVertical: 10,
    bottom: 35,
  },
  labelSignup: {
    fontSize: 14,
    color: "#444",
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#FFFFFF",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  fakeCheckbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 3,
  },
  rememberText: {
    marginLeft: 5,
    marginRight: 'auto',
  },
  forgotPassword: {
    color: "#777",
    fontSize: 13,
  },
  signUpButton: {
    backgroundColor: "#130160",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 30,
  },
  signUpButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  orText: {
    textAlign: "center",
    marginVertical: 12,
    color: "#666",
  },
  googleButton: {
    backgroundColor: "#EFEBFF",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  googlelogo: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#EFEBFF',
        alignItems: 'center',
        width: 22,
        height: 22,
       marginRight: 10,
  },
  googleText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
  },
  footerText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 13,
    color: "#444",
  },
  signInLink: {
    color: "#F29C1F",
    fontWeight: "600",
  },
});

export default SignUpPage;
