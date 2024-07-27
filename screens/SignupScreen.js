import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../utils/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebaseConfig";

// Get device dimensions
const { width, height } = Dimensions.get("window");

const SignupScreen = () => {
  // Hook for navigation
  const navigation = useNavigation();

  // State variables for managing input fields and loading state
  const [secureEntry, setSecureEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle user signup
  const SIGNUP = async () => {
    // Set loading state to true to indicate that the signup process has started¨
    setLoading(true);
    try {
      // Attempt to create a new user with the provided email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // Log the user credentials to the console
      console.log(userCredential.user);

      // Save user data to Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        firstName: firstName,
        
        email: email,
        uid: user.uid,
      });

      // Show an alert to the user to check their email for verification
      alert("Check your email for verification");
      // Clear the input fields
      setFirstName("");
      setPhone("");
      setEmail("");
      setPassword("");
      // Set loading state to false as the signup process has completed
      setLoading(false);
    } catch (error) {
      // If there is an error, log it to the console and show an alert to the user
      console.log(error);
      alert(error.message);
      setLoading(false);
    }
  };

  // Function to navigate back to the previous screen
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Function to navigate to the Login screen
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        {/* <Ionicons name={"arrow-back-outline"} color={colors.secondary} size={35} /> */}
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText1}>Let's Register</Text>
        <Text style={styles.headingText2}>Account</Text>
        <Text style={styles.subHeadingText}>
          Hello User, let's better Kenya
        </Text>
      </View>

      <View style={styles.formContainer}>
        {/* Input field for Name */}
        <View style={styles.inputContainer}>
          <Ionicons name={"person-outline"} size={30} color={colors.primary} />
          <TextInput
            style={styles.textInput}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter your name"
            placeholderTextColor="#666"
          />
        </View>
        {/* Input field for Phone Number */}
        <View style={styles.inputContainer}>
          <SimpleLineIcons
            name={"screen-smartphone"}
            size={30}
            color={colors.primary}
          />
          <TextInput
            style={styles.textInput}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone no"
            placeholderTextColor="#666"
            keyboardType="phone-pad"
          />
        </View>
        {/* Input field for Email */}
        <View style={styles.inputContainer}>
          <Ionicons name={"mail-outline"} size={30} color={colors.primary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor="#666"
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
            placeholder="Enter your password"
            placeholderTextColor="#666"
            secureTextEntry={secureEntry}
            value={password}
            onChangeText={setPassword}
          />
          {/* Toggle password visibility */}
          <TouchableOpacity onPress={() => setSecureEntry((prev) => !prev)}>
            <SimpleLineIcons name={"eye"} size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Sign up button */}
        <TouchableOpacity style={styles.signupButtonWrapper} onPress={SIGNUP}>
          <Text style={styles.signupText}>
            {loading ? "Signing up..." : "Sign up"}
          </Text>
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

        {/* Navigate to Login screen */}
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Already have an account!</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#000000",
    padding: width * 0.05, // Adjust padding based on screen width
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    justifyContent: "center",
    marginBottom: 20,
  },
  textContainer: {
    marginVertical: height * 0.01, // Adjust margin based on screen height
  },
  headingText1: {
    marginTop: -85,
    fontSize: width * 0.1, // Responsive font size based on screen width
    color: colors.secondary,
    fontWeight: "bold",
  },
  headingText2: {
    fontSize: width * 0.1, // Responsive font size based on screen width
    color: colors.secondary,
    fontWeight: "bold",
  },
  subHeadingText: {
    fontSize: width * 0.06, // Responsive font size based on screen width
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: height * 0.01, // Adjust margin based on screen height
  },
  formContainer: {
    marginTop: height * 0.02, // Adjust margin based on screen height
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#666666",
    borderRadius: 10,
    paddingHorizontal: width * 0.03, // Adjust padding based on screen width
    flexDirection: "row",
    alignItems: "center",
    marginVertical: height * 0.01, // Adjust margin based on screen height
    paddingVertical: height * 0.01, // Adjust padding based on screen height
  },
  textInput: {
    color: "#000000",
    flex: 1,
    paddingHorizontal: width * 0.02, // Adjust padding based on screen width
  },
  signupButtonWrapper: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    marginTop: height * 0.03, // Adjust margin based on screen height
    paddingVertical: height * 0.02, // Adjust padding based on screen height
    alignItems: "center",
  },
  signupText: {
    color: "#FFFFFF",
    fontSize: width * 0.05, // Responsive font size based on screen width
  },
  continueText: {
    textAlign: "center",
    marginVertical: height * 0.02, // Adjust margin based on screen height
    fontSize: width * 0.04, // Responsive font size based on screen width
    color: colors.white,
  },
  googleButtonContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#666666",
    borderRadius: 10,
    height: height * 0.06, // Adjust height based on screen height
    justifyContent: "center",
    alignItems: "center",
    padding: width * 0.02, // Adjust padding based on screen width
    marginVertical: height * 0.01, // Adjust margin based on screen height
  },
  googleImage: {
    height: height * 0.03, // Adjust image size based on screen height
    width: height * 0.03, // Adjust image size based on screen height
    marginRight: width * 0.02, // Adjust margin based on screen width
  },
  googleText: {
    fontSize: width * 0.04, // Responsive font size based on screen width
    color: "#FFFFFF",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.02, // Adjust margin based on screen height
  },
  accountText: {
    color: "#FFFFFF",
  },
  loginText: {
    color: colors.secondary,
    marginLeft: width * 0.01, // Adjust margin based on screen width
  },
});

export default SignupScreen;
