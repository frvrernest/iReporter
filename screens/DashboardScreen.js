import React from 'react';
import { useState, useEffect} from "react";
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';



const DashboardScreen = () => {
    const [reports, setReports] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [filteredReports, setFilteredReports] = useState([]);

    useEffect(() => {
        fetchReports();
    },[sortBy]);

    useEffect(() => {
        filterReports();
      }, [searchTerm, reports]);

    const fetchReports = async () => {
        try{
            const response = await fetch('http://192.168.100.84:3000/reports');
            if (!response.ok) {
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
          report.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredReports(filtered);
      };

      const handleSearch = () => {
        filterReports();
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
            <View style={styles.topNav}>
                <Text style={styles.title}> Admin</Text>
                
            </View>

            <View style={styles.searchContainer}>
            <TextInput
            style={styles.searchBar}
            placeholder="Search reports..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            </TouchableOpacity>

            </View>
            

            <Picker selectedValue={sortBy} onValueChange={setSortBy} style={styles.picker}>
                <Picker.Item label="Date" value="date" />
                <Picker.Item label="Status" value="status" />
                <Picker.Item label="Location" value="location" />
            </Picker>

            <FlatList
                data={sortedReports}
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6200ee',
        paddingHorizontal: 20
    },
    title: {
        color: '#fff',
        fontSize: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10

    },
    searchBar: {
        flex:1,
        height: 40,
        borderColor: 'gray',
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