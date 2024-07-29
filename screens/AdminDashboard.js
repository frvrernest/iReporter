import React from 'react';
import { useState, useEffect} from "react";
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from "@expo/vector-icons";


const DashboardScreen = () => {
    const [reports, setReports] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [filteredReports, setFilteredReports] = useState([]);
    const [searchAttribute, setSearchAttribute] = useState('title');

    useEffect(() => {
        fetchReports();
    },[sortBy]);

    useEffect(() => {
        filterReports();
      }, [searchTerm, reports]);

    const fetchReports = async () => {
        try{
            const response = await fetch('http://192.168.100.2:3000/reports');
            console.log('Fetching reports..');
            if (!response.ok) {
                console.log('Network response was not ok');
                throw new Error('Network response was not ok');
              }
            const data = await response.json();
            setReports(data);

        }catch(error){
            console.error(error);
        }
    };

    const filterReports = () => {
        const filtered = reports.filter(report =>
          report[searchAttribute].toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredReports(filtered);
      };

      const handleSearch = () => {
        filterReports();
      };

      const handleClearSearch = () => {
        setSearchTerm('');
        setFilteredReports(reports);
      };

    const sortedReports = filteredReports.sort((a, b) => {
    if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
    } else {
        return a.location.localeCompare(b.location);
    }
    });

    return(
        <View style={styles.container}>
            

            <View style={styles.searchContainer}>
            <TextInput
            style={styles.searchBar}
            placeholder={`Search by ${searchAttribute}...`}
            value={searchTerm}
            onChangeText={text => setSearchTerm(text)}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Ionicons name="search" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.clearButton} onPress={handleClearSearch}>
            <Ionicons name="close-circle" size={20} color="#fff" /> 
            </TouchableOpacity>

            </View>
            

            <Picker selectedValue={searchAttribute} onValueChange={(itemValue) => setSearchAttribute(itemValue)} style={styles.picker}>
                <Picker.Item label="Date" value="date" />
                <Picker.Item label="Status" value="status" />
                <Picker.Item label="Location" value="location" />
            </Picker>

            <Text style={{fontSize: 20, margin: 15}}> Reports from others..</Text>

            <FlatList
                data={sortedReports}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <TouchableOpacity
                style={styles.reportItem}                 
                onPress={() => navigation.navigate('ReportDetails', { report: item })}
                >
                    <Text style={styles.reportTitle}>{item.title}</Text>
                    <Text>Status: {item.status}</Text>
                    

                </TouchableOpacity>
                )}
                />
        
        </View>

        
    )

}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'black',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10

    },
    searchBar: {
        flex:1,
        height: 40,
        backgroundColor: 'white',
        borderColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        margin: 10,
        paddingLeft: 10,
      },
    searchButton: {
        backgroundColor: '#6200ee',
        padding: 10,
        borderRadius: 4,
      },
    clearButton: {
        backgroundColor: 'red',
        padding: 10,
        marginLeft: 10,
        borderRadius: 4,
      },
    picker: {
        height: 50,
        width: '100%',
        color: 'white',
    },
    reportItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#ffffff',
        shadowColor: '#000',
      },
      reportTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007bff'
      },
})
export default DashboardScreen;