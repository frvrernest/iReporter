import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { colors } from "../utils/color";

const HomeScreen = () => {
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
    fontSize: 52, 
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
});
