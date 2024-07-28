import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import { FONTS } from "../src/fonts/fonts";
import { auth, firestore } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { colors } from "../utils/colors";
import { doc, getDoc } from "firebase/firestore";

const LoginScreen = () => {
  const navigation = useNavigation(); // Hook for navigation

  // State variables for managing input fields, loading state, and password visibility
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const [secureEntry, setSecureEntry] = useState(true); 

  // Function to handle user login
  const Login = async () => {
    // Set loading state to true to indicate that the login process has started
    setLoading(true); 
    try {
      // Attempt to sign in with the provided email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch the user's first name and profile image from Firestore
      const userDoc = await getDoc(doc(firestore, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const firstName = userData.firstName;
        const profileImage = userData.profileImage;

        // Navigate to the "PostedReports" screen with the user's first name and profile image
        if (firstName) {
          navigation.navigate("PostedReports", { firstName, profileImage });
        } else {
          navigation.navigate("UpdateProfile");
        }
      } else {
        navigation.navigate("UpdateProfile");
      }

      setLoading(false);
      // if there is an error display an alert with the error message
    } catch (error) {
      console.log(error);
      alert(error.message);
      setLoading(false);
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
        {/* <Ionicons name={"arrow-back-outline"} color={colors.primary} size={25} /> */}
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText1}>Let's Sign you in</Text>
        <Text style={styles.headingText2}>Welcome Back</Text>
        <Text style={styles.headingText3}>You have been missed!!!</Text>
      </View>

      <View style={styles.formContainer}>
        {/* Input field for Email */}
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
        {/* Input field for Password */}
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
            onPress={() => setSecureEntry((prev) => !prev)}
          >
            <SimpleLineIcons name={"eye"} size={20} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        {/* Login button */}
        <TouchableOpacity style={styles.loginButtonWrapper} onPress={Login}>
          <Text style={styles.loginText}>{loading ? "Signing in..." : "Sign in"}</Text>
        </TouchableOpacity>
        <Text style={styles.continueText}>or continue with</Text>
        {/* Google sign in button */}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000', // Black background color
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
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
    color: '#fff',
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
    color: '#333', 
    marginTop: 20,
    flex: 1,
  },
  inputContainer: {
    color: '#333', 
    backgroundColor: '#D3D3D3', 
    borderWidth: 1,
    borderColor: '#333',
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
    color: '#fff',
    marginVertical: 10,
  },
  loginButtonWrapper: {
    backgroundColor: '#333',
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
    color: '#fff',
  },
  signupText: {
    color: colors.secondary,
    marginLeft: 5,
  },
});

export default LoginScreen;
