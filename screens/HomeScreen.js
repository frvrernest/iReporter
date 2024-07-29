import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing, Dimensions } from "react-native";
import React, { useEffect, useRef } from "react";
import { colors } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";
import { FONTS } from "../src/fonts/fonts";

const { width, height } = Dimensions.get('window'); // Get device dimensions

const HomeScreen = () => {
  // Helps to navigate from one screen to the other
  const navigation = useNavigation();

  // Animation refs
  const logoScale = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  // Function for when the user clicks on the login
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  // Function for when the user clicks on the register
  const handleSignup = () => {
    navigation.navigate("SIGNUP");
  };

  // Animate logo on mount
  useEffect(() => {
    Animated.timing(logoScale, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }).start();
  }, [logoScale]);

  // Animate button press
  const animateButtonPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const animateButtonPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.Image 
        source={require("../src/assets/LOGO.png")} 
        style={[styles.logo, { transform: [{ scale: logoScale }] }]} 
      />
      <Text style={styles.title}>Be the Change.</Text>
      <Text style={styles.title}>Report with iReporter.</Text>
      <Text style={styles.text}>
        With a few taps, you can document incidents, upload evidence, and join a
        community working towards a brighter future. Download iReporter today
        and be the voice for change.
      </Text>
      <View style={styles.buttonContainer}>
        <AnimatedTouchableOpacity
          style={[styles.button, styles.buttonLeft, { transform: [{ scale: buttonScale }] }]}
          onPressIn={animateButtonPressIn}
          onPressOut={animateButtonPressOut}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </AnimatedTouchableOpacity>
        <AnimatedTouchableOpacity
          style={[styles.button, styles.buttonRight, { transform: [{ scale: buttonScale }] }]}
          onPressIn={animateButtonPressIn}
          onPressOut={animateButtonPressOut}
          onPress={handleSignup}
        >
          <Text style={styles.buttonText}>Register</Text>
        </AnimatedTouchableOpacity>
      </View>
    </View>
  );
};

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.05, // Responsive padding
    backgroundColor: '#000000', 
  },
  logo: {
    width: width * 0.6, // Larger width
    height: width * 0.5, // Larger height
    marginBottom: height * 0.05, // Responsive margin
    borderRadius: 20, // Rounded corners
  },
  title: {
    fontSize: width * 0.08, // Responsive font size
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.secondary,
    marginBottom: height * 0.02, // Responsive margin
    fontFamily: FONTS.SemiBold,
  },
  text: {
    fontSize: width * 0.045, // Responsive font size
    lineHeight: width * 0.06, // Responsive line height
    fontFamily: FONTS.Medium,
    textAlign: 'center',
    color: '#ffffff', // Changed text color to white for better contrast
    marginBottom: height * 0.05, // Responsive margin
    paddingHorizontal: width * 0.05, // Responsive padding
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: height * 0.02, // Responsive padding
    paddingHorizontal: width * 0.05, // Responsive padding
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: width * 0.02, // Responsive margin
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonLeft: {
    backgroundColor: '#ffffff', // White background
  },
  buttonRight: {
    backgroundColor: colors.secondary, // Secondary color background
  },
  buttonText: {
    color: '#000000',
    fontSize: width * 0.045, // Responsive font size
    fontWeight: '600',
    fontFamily: FONTS.Bold, // Ensure font family consistency
  },
});

export default HomeScreen;
