import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing, Dimensions } from "react-native";
import React, { useEffect, useRef } from "react";
import { colors } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";
import { FONTS } from "../src/fonts/fonts";
import { Icon } from 'react-native-elements';

const { width, height } = Dimensions.get('window'); // Get device dimensions

const HomeScreen = () => {
  // Helps to navigate from one screen to the other
  const navigation = useNavigation();

  // Animation refs
  const iconScale = useRef(new Animated.Value(1)).current;
  const iconTranslateY = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  // Function for when the user clicks on the login
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  // Function for when the user clicks on the register
  const handleSignup = () => {
    navigation.navigate("SIGNUP");
  };

  // Animate icon on mount
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(iconScale, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(iconScale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(iconTranslateY, {
          toValue: -10,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(iconTranslateY, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ]),
    ).start();
  }, [iconScale, iconTranslateY]);

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
      <Animated.View style={[styles.iconContainer, { transform: [{ scale: iconScale }, { translateY: iconTranslateY }] }]}>
        <Icon
          name="person"
          type="material"
          size={width * 0.3} //  size
          color="blue"
        />
        <Icon
          name="report"
          type="material"
          size={width * 0.15} //  size
          color="red"
          containerStyle={styles.reportIcon}
        />
        <Icon
          name="report"
          type="material"
          size={width * 0.15} //  size
          color="red"
          containerStyle={styles.warningIcon}
        />
      </Animated.View>
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
  iconContainer: {
    marginBottom: height * 0.05, // Responsive margin
    alignItems: 'center',
  },
  reportIcon: {
    position: 'absolute',
    bottom: -30,
    right: -30,
  },
  warningIcon: {
    position: 'absolute',
    bottom: -30,
    left: -30,
  },
  title: {
    fontSize: width * 0.08, // Responsive font size
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'blue',
    marginBottom: height * 0.02, // Responsive margin
    fontFamily: FONTS.SemiBold,
  },
  text: {
    fontSize: width * 0.045, // Responsive font size
    lineHeight: width * 0.06, // Responsive line height
    fontFamily: FONTS.Medium,
    textAlign: 'center',
    color: 'white',
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
