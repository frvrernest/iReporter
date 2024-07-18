import React from "react";
import { useState, useEffect} from "react";
import { Text, View, StyleSheet, Button } from "react-native";

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.topNav}>
                <Text style={styles.title}>iReporter</Text>
            </View>
            <Text>Home Screen</Text>
        </View>
    )  
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    topNav: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    title: {
        color: '#fff',
        fontSize: 20,
      },


})

export default HomeScreen;

