import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';


const DashboardScreen = () => {
    return(
        <View style={styles.container}>
            <View style={styles.topNav}>
                <Text style={styles.title}>IReporter Admin</Text>
            </View>
        </View>
    )

}
const styles=StyleSheet.create({
    container:{
        flex:1
    },
    topNav: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6200ee',
    },
    title: {
        color: '#fff',
        fontSize: 20,
    }
})
export default DashboardScreen;