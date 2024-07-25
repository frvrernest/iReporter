import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';


const DashboardScreen = () => {
    return(
        <View style={styles.container}>
            <View style={styles.topNav}>
                <Text style={styles.title}>IReporter Admin</Text>
            </View>

            <TextInput
            style={styles.searchBar}
            placeholder="Search reports..."
            />
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
    },
    searchBar: {
        height: 40,
        borderColor: 'gray',
        borderRadius: 20,
        borderWidth: 1,
        margin: 10,
        paddingLeft: 10,
      },
})
export default DashboardScreen;