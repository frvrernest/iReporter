// main screen after login, display recent records and status update
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// main screen after login, display recent records and status update
const DashboardScreen = () => {
    const [records, setRecords] = useState([]);
    const [status, setStatus] = useState('');

    useEffect(() => {
        // Fetch recent records and status update
        fetchRecords();
        fetchStatus();
    }, []);

    const fetchRecords = async () => {
        // Simulate fetching records
        const fetchedRecords = await fetch('/api/records'); // Replace with your API
        setRecords(await fetchedRecords.json());
    };

    const fetchStatus = async () => {
        // Simulate fetching status
        const fetchedStatus = await fetch('/api/status'); // Replace with your API
        setStatus(await fetchedStatus.json());
    };

    return (
        <View style={styles.container}>
            <Text style={styles.statusText}>Status Update: {status}</Text>
            <FlatList
                data={records}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.recordItem}>
                        <Text style={styles.recordTitle}>{item.title}</Text>
                    </View>
                )}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f9fa', // Light background color
    },
    statusText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333', // Dark text color
    },
    listContainer: {
        paddingBottom: 20,
    },
    recordItem: {
        padding: 12,
        marginVertical: 8,
        borderRadius: 8,
        backgroundColor: '#ffffff', // White background for records
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2, // For Android shadow
    },
    recordTitle: {
        fontSize: 16,
        color: '#007bff', // Blue color for titles
    },
});

export default DashboardScreen;