import React from 'react';
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from "@expo/vector-icons";

const DashboardScreen = ({ navigation }) => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchAttribute, setSearchAttribute] = useState('title');

  useEffect(() => {
    fetchReports();
  }, [sortBy]);

  useEffect(() => {
    filterReports();
  }, [searchTerm, reports]);

  const fetchReports = async () => {
    try {
      const response = await fetch('http://192.168.100.2:3000/reports');
      console.log('Fetching reports..');
      if (!response.ok) {
        console.log('Network response was not ok');
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setReports(data);
    } catch (error) {
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

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder={`Search by ${searchAttribute}...`}
          placeholderTextColor="#999"
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

      <Picker
        selectedValue={searchAttribute}
        onValueChange={(itemValue) => setSearchAttribute(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Title" value="title" />
        <Picker.Item label="Date" value="date" />
        <Picker.Item label="Status" value="status" />
        <Picker.Item label="Location" value="location" />
      </Picker>

      <Text style={styles.reportsTitle}>Reports from others</Text>

      <FlatList
        data={sortedReports}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.reportItem}
            onPress={() => navigation.navigate('ReportDetails', { report: item })}
          >
            <Text style={styles.reportTitle}>{item.title}</Text>
            <Text style={styles.reportText}>Status: {item.status}</Text>
            <Text style={styles.reportText}>Location: {item.location}</Text>
            <Text style={styles.reportText}>Date: {item.date}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    color: '#000',
  },
  searchButton: {
    backgroundColor: '#6E77F6',
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  clearButton: {
    backgroundColor: '#F00',
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#fff',
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: 20,
  },
  reportsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6E77F6',
    marginBottom: 10,
  },
  reportItem: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  reportText: {
    color: '#ccc',
  },
});

export default DashboardScreen;
