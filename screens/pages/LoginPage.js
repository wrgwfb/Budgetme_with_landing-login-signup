import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Switch } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Loginlogo from "../../assets/logoacc.png"; // Replace with your logo
import Googlelogo from "../../assets/googleLogo.png";

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handlePress = () => {
    navigation.navigate("Main"); // Navigate to your Home/Main screen
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back-outline" size={24} color="#000" />
      </TouchableOpacity>

      <Image
        source={Loginlogo} // Replace with actual logo URI
        style={styles.loginlogo} resizeMode="contain"
      />
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor
      </Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={22} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
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
        <Text style={styles.rememberText}>Remember me</Text>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handlePress}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or</Text>

      <TouchableOpacity style={styles.googleButton}>
        <Image source={Googlelogo} style={styles.googlelogo}/>
        
        <Text style={styles.googleText}>SIGN IN WITH GOOGLE</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text>You don’t have an account yet? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignupPage")}>
          <Text style={styles.signUp}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  loginlogo: {
    bottom: 30,
    width: 140,
    height: 140,
    alignSelf: "center",
  },
  title: {
    bottom: 60,
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#2c1c53',
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
    bottom: 50,
  },
  label: {
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
    marginTop: 5,
    backgroundColor: "#FFFFFF",
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  rememberText: {
    marginLeft: 5,
    marginRight: 'auto',
  },
  forgotPassword: {
    marginLeft: 'auto',
  },
  link: {
    color: '#2c1c53',
  },
  loginButton: {
    backgroundColor: '#130160',
    padding: 14,
    borderRadius: 10,
    marginTop: 40,
    alignItems: 'center',
    marginHorizontal: 30,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 12,
    padding: 1,
    paddingTop: 1,
  },
  googleButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#EFEBFF',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 30,
  },
  googlelogo: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#EFEBFF',
    alignItems: 'center',
    width: 22,
    height: 22,
  },
  googleText: {
    marginLeft: 10,
    fontWeight: '500',
    fontSize: 13,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUp: {
    color: 'orange',
    marginLeft: 5,
    fontWeight: '600',
  },
});
