import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert, // Import Alert for displaying alert messages
} from "react-native";
import React, { useState } from "react";
import { colors } from "../utils/colors";

import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import { FONTS } from "../src/fonts/fonts";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {
  // Navigation hook to navigate between screens
  const navigation = useNavigation();

  // State hooks for managing email, password, loading state, and secure text entry
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [secureEntry, setSecureEntry] = useState(true);

  // Function to handle user login
  const Login = async () => {
    setLoading(true); // Set loading state to true
    try {
      // Attempt to sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user); // Log the user credentials
      // Display success alert and navigate to "PostedReports" screen on OK press
      Alert.alert("Success", "Successfully signed in!", [
        { text: "OK", onPress: () => navigation.navigate("PostedReports") },
      ]);
      setLoading(false); // Set loading state to false
    } catch (error) {
      console.log(error); // Log any errors
      // Display error alert with the error message
      Alert.alert("Error", error.message);
      setLoading(false); // Set loading state to false
    }
  };

  // Function to navigate back to the previous screen
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Function to navigate to the Signup screen
  const handleSignup = () => {
    navigation.navigate("SIGNUP");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        {/* Back button icon (commented out) */}
        {/* <Ionicons name={"arrow-back-outline"} color={colors.primary} size={25} /> */}
      </TouchableOpacity>
      <View style={styles.textContainer}>
        {/* Display headings */}
        <Text style={styles.headingText1}>Let's Sign you in</Text>
        <Text style={styles.headingText2}>Welcome Back</Text>
        <Text style={styles.headingText3}>You have been missed!!!</Text>
      </View>

      <View style={styles.formContainer}>
        {/* Input field for email */}
        <View style={styles.inputContainer}>
          <Ionicons name={"mail-outline"} size={30} />
          <TextInput
            style={styles.textInput}
            placeholder="Email, phone & username"
            placeholderTextColor={colors.primary}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        {/* Input field for password */}
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={"lock"} size={30} color={colors.primary} />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor={colors.primary}
            secureTextEntry={secureEntry}
            value={password}
            onChangeText={setPassword}
          />
          {/* Toggle password visibility */}
          <TouchableOpacity
            onPress={() => {
              setSecureEntry((prev) => !prev);
            }}
          >
            <SimpleLineIcons name={"eye"} size={20} />
          </TouchableOpacity>
        </View>
        {/* Forgot password link */}
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        {/* Sign in button */}
        <TouchableOpacity style={styles.loginButtonWrapper} onPress={Login}>
          <Text style={styles.loginText}>{loading ? "Signing in..." : "Sign in"}</Text>
        </TouchableOpacity>
        {/* Continue with Google */}
        <Text style={styles.continueText}>or continue with</Text>
        <TouchableOpacity style={styles.googleButtonContainer}>
          <Image
            source={require("../utils/google.png")}
            style={styles.googleImage}
          />
          <Text style={styles.googleText}></Text>
        </TouchableOpacity>
        {/* Navigate to Signup screen */}
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Don't have an account?</Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.signupText}>Register Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.white,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  textContainer: {
    marginBottom: 0,
    marginTop: 10,
  },
  headingText1: {
    fontSize: 43,
    marginTop: 0,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
    marginTop: -80,
    fontFamily: FONTS.SemiBold,
  },
  headingText2: {
    fontSize: 34,
    fontWeight: "bold",
    color: colors.secondary,
    marginBottom: 5,
  },
  headingText3: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.secondary,
  },
  formContainer: {
    marginTop: 20,
    flex: 1,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    height: 50,
    marginBottom: 10,
    padding: 2,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  forgotPasswordText: {
    textAlign: "right",
    color: colors.primary,
    marginVertical: 10,
  },
  loginButtonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginTop: 20,
    paddingVertical: 15,
    alignItems: "center",
  },
  loginText: {
    color: colors.white,
    fontSize: 18,
  },
  continueText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 14,
    color: colors.secondary,
  },
  googleButtonContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
    height: 50,
  },
  googleImage: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  googleText: {
    fontSize: 16,
    color: colors.primary,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  accountText: {
    color: colors.primary,
  },
  signupText: {
    color: colors.secondary,
    marginLeft: 5,
  },
});

export default LoginScreen;
