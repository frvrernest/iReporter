import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';


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

            <Picker  style={styles.picker}>
                <Picker.Item label="Date" value="date" />
                <Picker.Item label="Status" value="status" />
                <Picker.Item label="Location" value="location" />
            </Picker>

            <FlatList
                //data={sortedReports}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.reportItem}
                    onPress={() => navigation.navigate('ReportDetails', { report: item })}
                >
                    <Text style={styles.reportTitle}>{item.title}</Text>
                    <Text>{item.location}</Text>
                    <Text>Status: {item.status}</Text>
                    <Text>{item.date}</Text>

                </TouchableOpacity>
                )}
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
    picker: {
        height: 50,
        width: '100%',
    },
    reportItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
      reportTitle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
})
export default DashboardScreen;