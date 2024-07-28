import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SwipeListView } from 'react-native-swipe-list-view';
import * as Animatable from 'react-native-animatable';

const ReportDetailsScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const loadReports = async () => {
            try {
                const storedReports = await AsyncStorage.getItem('reports');
                if (storedReports) {
                    const parsedReports = JSON.parse(storedReports);
                    console.log(parsedReports); // Check structure of reports
                    setReports(parsedReports);
                }
            } catch (error) {
                console.error('Failed to load reports', error);
            }
        };
    
        loadReports();
    }, []);

    const saveReport = async () => {
        if (!title || !description || !location) {
            Alert.alert('Validation Error', 'Please fill out all fields');
            return;
        }

        const report = {
            id: Date.now().toString(), // Unique ID for the report
            title,
            description,
            location,
        };

        try {
            const newReports = [...reports, report];
            await AsyncStorage.setItem('reports', JSON.stringify(newReports));
            setReports(newReports);
            Alert.alert('Success', 'Report saved successfully');
            // Clear inputs
            setTitle('');
            setDescription('');
            setLocation('');
        } catch (error) {
            Alert.alert('Error', 'Failed to save the report');
        }
    };

    const handleEdit = (id) => {
        navigation.navigate('EditRecord', { reportId: id });
    };

    const handleDelete = async (id) => {
        try {
            const newReports = reports.filter(report => report.id !== id);
            await AsyncStorage.setItem('reports', JSON.stringify(newReports));
            setReports(newReports);
            Alert.alert('Success', 'Report deleted successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to delete the report');
        }
    };

    return (
        <View style={styles.container}>
            <SwipeListView
                data={reports}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <Animatable.View
                        animation="slideInLeft"
                        delay={index * 300}
                        useNativeDriver
                        style={styles.reportItem}
                    >
                        <Text style={styles.reportTitle}>{item.title}</Text>
                        <Text>{item.description}</Text>
                        <Text>{item.location}</Text>
                    </Animatable.View>
                )}
                renderHiddenItem={({ item }) => (
                    <View style={styles.hiddenContainer}>
                        <Button
                            title="Edit"
                            onPress={() => handleEdit(item.id)}
                            color="green"
                        />
                        <Button
                            title="Delete"
                            onPress={() => handleDelete(item.id)}
                            color="red"
                        />
                    </View>
                )}
                rightOpenValue={-150}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#000000', // Light background for the container
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 12,
        color: '#ffffff', // Darker text for better readability
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        backgroundColor: '#000000', // White background for inputs
    },
    reportItem: {
        backgroundColor: '#333',
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3, // For Android shadow
    },
    reportTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
    },
    hiddenContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#000000', // Red background for delete
        borderRadius: 8,
        paddingHorizontal: 20,
    },
    hiddenButton: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    hiddenButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
});

export default ReportDetailsScreen;
