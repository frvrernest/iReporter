import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../utils/colors";
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

  // Function for when the user clicks to view posted reports
  const handlePostedReports = () => {
    navigation.navigate("PostedReports");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../src/assets/LOGO.png")} style={styles.logo} />
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
      <TouchableOpacity style={styles.reportsButton} onPress={handlePostedReports}>
        <Text style={styles.buttonText}>View Posted Reports</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  buttonLeft: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
  },
  buttonRight: {
    flex: 1,
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  reportsButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
});

export default HomeScreen;
