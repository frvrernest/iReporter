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

const { width, height } = Dimensions.get("window");

const SignupScreen = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);

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
          <Ionicons name={"person-outline"} size={30}  />
          <TextInput styles={styles.textInput} 
          placeholderTextColor={colors.primary}
          placeholder="Enter your name" />
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={"screen-smartphone"} size={30}  />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your phone no"
            placeholderTextColor={colors.primary}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name={"mail-outline"} size={30}  />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor={colors.primary}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={"lock"} size={30}  />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor={colors.primary}
            secureTextEntry={secureEntry}
          />
          <TouchableOpacity onPress={() => setSecureEntry((prev) => !prev)}>
            <SimpleLineIcons name={"eye"} size={20} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signupButtonWrapper}>
          <Text style={styles.signupText}>Sign up</Text>
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
    backgroundColor: colors.white,
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
    color: colors.primary,
    marginTop: height * 0.01, // Adjust margin based on screen height
  },
  formContainer: {
    marginTop: height * 0.02, // Adjust margin based on screen height
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: width * 0.03, // Adjust padding based on screen width
    flexDirection: "row",
    alignItems: "center",
    marginVertical: height * 0.01, // Adjust margin based on screen height
    paddingVertical: height * 0.01, // Adjust padding based on screen height
  },
  textInput: {
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
    color: colors.white,
    fontSize: width * 0.05, // Responsive font size based on screen width
  },
  continueText: {
    textAlign: "center",
    marginVertical: height * 0.02, // Adjust margin based on screen height
    fontSize: width * 0.04, // Responsive font size based on screen width
    color: colors.primary,
  },
  googleButtonContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.primary,
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
    color: colors.secondary,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.02, // Adjust margin based on screen height
  },
  accountText: {
    color: colors.primary,
  },
  loginText: {
    color: colors.secondary,
    marginLeft: width * 0.01, // Adjust margin based on screen width
  },
});

export default SignupScreen;