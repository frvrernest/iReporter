import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../utils/color";

import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";

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
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons
          name={"arrow-back-outline"}
          color={colors.primary}
          size={35}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText1}>Let's Register</Text>
        <Text style={styles.headingText2}>Account</Text>
        <Text style={styles.subHeadingText}>Hello User, let's better Kenya</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name={"person-outline"} size={30} color={colors.secondary} />
          <TextInput styles={styles.textInput} placeholder="Enter your name" />
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons
            name={"screen-smartphone"}
            size={30}
            color={colors.secondary}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your phone no"
            placeholderTextColor={colors.secondary}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name={"mail-outline"} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor={colors.secondary}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={"lock"} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor={colors.secondary}
            secureTextEntry={secureEntry}
          />
          <TouchableOpacity
            onPress={() => {
              setSecureEntry((prev) => !prev);
            }}
          >
            <SimpleLineIcons name={"eye"} size={20} color={colors.secondary} />
          </TouchableOpacity>
        </View>
       

        <TouchableOpacity style={styles.signupButtonWrapper}>
          <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>
        <Text style={styles.continueText}>or continue with</Text>
        <TouchableOpacity style={styles.googleButtonContainer}>
          <Image
            source={require("../utils/google.png")}
            style={styles.googleImage}
          />
          <Text style={styles.googleText}></Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Already have an account!</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    justifyContent: "center",
    marginBottom: 20, 
  },
  textContainer: {
    // Added margin for better spacing very important
    marginVertical: 5, 
  
  },
  headingText1: {
    fontSize: 42,
    color: colors.primary,
    fontWeight: "bold", 

    
  },
  headingText2: {
    fontSize: 42,
    color: colors.primary,
    fontWeight: "bold",
   
  },
  subHeadingText: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.secondary,
    marginTop: 10, 
  },
  formContainer: {
    marginTop: 10, 
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 10, 
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingVertical: 10, 
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  signupButtonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginTop: 20,
    paddingVertical: 15,
    alignItems: "center",
  },
  signupText: {
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
    gap: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
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
    color: colors.secondary,
  },
  loginText: {
    color: colors.primary,
    marginLeft: 5,
  },
});

export default SignupScreen;
