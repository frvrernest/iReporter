import { StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import React from "react";
import { colors } from "../utils/color";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLogin = () => {
    // Your login logic here
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <FontAwesome5 name={"arrow-left"} color="black" size={20} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Let's Sign you in</Text>
        <Text style={styles.heading2}>Welcome Back,</Text>
        <Text style={styles.heading3}>You have been missed!</Text>
        
        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="user" size={20} color="black" />
            <TextInput
              style={styles.input}
              placeholder="Username, Email, Phone"
              placeholderTextColor={colors.black}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="lock" size={20} color="black" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={colors.black}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity style={styles.forgotButton}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Google Sign-In */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.divider} />
        </View>
        <TouchableOpacity style={styles.googleButton}>
          <FontAwesome5 name="google" size={20} color="black" />
          <Text style={styles.googleText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  backButton: {
    height: 50,
    width: 50,
    backgroundColor: colors.gray,
    borderRadius: 25,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginVertical: 20,
  },
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.black,
  },
  heading2: {
    fontSize: 28,
    color: colors.black,
  },
  heading3: {
    fontSize: 28,
    color: colors.black,
  },
  form: {
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightGray,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  forgotButton: {
    alignItems: "flex-end",
    marginVertical: 10,
  },
  forgotText: {
    color: colors.primary,
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  signInText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.google,
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: "center",
    marginVertical: 10,
  },
  googleText: {
    color: colors.black,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray,
  },
  orText: {
    marginHorizontal: 10,
    color: colors.black,
    fontSize: 18,
    fontWeight: "bold",
  },
});
