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

const { width, height } = Dimensions.get("window");

const SignupScreen = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SIGNUP = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user);
      alert("Check your email for verification");
      setLoading(false);
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
        <Text style={styles.subHeadingText}>Hello User, let's better Kenya</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name={"person-outline"} size={30} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your name"
            placeholderTextColor={colors.primary}
          />
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={"screen-smartphone"} size={30} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your phone no"
            placeholderTextColor={colors.primary}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name={"mail-outline"} size={30} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor={colors.primary}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={"lock"} size={30} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor={colors.primary}
            secureTextEntry={secureEntry}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecureEntry((prev) => !prev)}>
            <SimpleLineIcons name={"eye"} size={20} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signupButtonWrapper} onPress={SIGNUP}>
          <Text style={styles.signupText}>{loading ? "Signing up..." : "Sign up"}</Text>
        </TouchableOpacity>
        <Text style={styles.continueText}>or continue with</Text>
        <TouchableOpacity style={styles.googleButtonContainer}>
          <Image source={require("../utils/google.png")} style={styles.googleImage} />
          <Text style={styles.googleText}></Text>
        </TouchableOpacity>
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
    backgroundColor: '#000000',
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
    color: '#fff',
    marginTop: height * 0.01, // Adjust margin based on screen height
  },
  formContainer: {
    color: '#333', 
    marginTop: height * 0.02, // Adjust margin based on screen height
  },
  inputContainer: {
    backgroundColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: width * 0.03, // Adjust padding based on screen width
    flexDirection: "row",
    alignItems: "center",
    marginVertical: height * 0.01, // Adjust margin based on screen height
    paddingVertical: height * 0.01, // Adjust padding based on screen height
  },
  textInput: {
    color: '#000000',
    flex: 1,
    paddingHorizontal: width * 0.02, // Adjust padding based on screen width
  },
  signupButtonWrapper: {
    backgroundColor: '#333',
    borderRadius: 10,
    marginTop: height * 0.03, // Adjust margin based on screen height
    paddingVertical: height * 0.02, // Adjust padding based on screen height
    alignItems: "center",
  },
  signupText: {
    color: colors.white,
    fontSize: width * 0.05, // Responsive font size based on screen width
  },
  continueText: {
    textAlign: "center",
    marginVertical: height * 0.02, // Adjust margin based on screen height
    fontSize: width * 0.04, // Responsive font size based on screen width
    color: '#fff',
  },
  googleButtonContainer: {
    flexDirection: "row",
    borderWidth: 1,
    color: '#fff',
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
    color: '#fff',
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.02, // Adjust margin based on screen height
  },
  accountText: {
    color: '#fff',
  },
  loginText: {
    color: '#fff',
    marginLeft: width * 0.01, // Adjust margin based on screen width
  },
});

export default SignupScreen;
