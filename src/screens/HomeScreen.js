import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../utils/color";
import { useNavigation } from "@react-navigation/native";


const HomeScreen = () => {
  // Helps to navigate from one screen to the other
  const navigation = useNavigation();

  // Function for when the user clicks on the login
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  // Function for when the user clicks on the register
  const handleSignup = () => {
    navigation.navigate("SIGNUP");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/LOGO.png")} style={styles.logo} />
      <Text style={styles.title}>Be the Change.</Text>
      <Text style={styles.title}>Report with iReporter.</Text>
      <Text style={styles.text}>
        With a few taps, you can document incidents, upload evidence, and join a
        community working towards a brighter future. Download iReporter today
        and be the voice for change.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonLeft} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRight} onPress={handleSignup}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 230,
    resizeMode: "contain",
    marginVertical: 20,
    marginTop: 0,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginVertical: 10,
    marginTop: 0,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    lineHeight: 30,
    fontWeight: "bold",
    color: colors.secondary,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 30,
    borderRadius: 50,
    overflow: "hidden",
  },
  buttonLeft: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.black,
    paddingVertical: 15,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
  buttonRight: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
