import React from "react";
import { useState, useEffect} from "react";
import { Text, View, StyleSheet, Button, Switch, FlatList, TouchableOpacity } from "react-native";
import { Icon } from "react-native-vector-icons/Ionicons";

const HomeScreen = () => {
    const [reportType, setReportType] = useState('Red-Flag');
    const [reports, setReports ] = useState([]);
    const [viewMap, setViewMap] = useState(false);

    useEffect(() => {
        fetchReports();
    },[reportType]);

    const fetchReports = async () => {
        try {
            const response = await axios.get('http://localhost:3000/reports');
            const filteredReports = response.data.filter(report => report.type === reportType);
            setReports(filteredReports);
        }catch(error) {
            console.error(error);
        }
    }

    const toggleView = () =>setViewMap(!viewMap);

    return (
        <View style={styles.container}>
            <View style={styles.topNav}>
                
                <Text style={styles.title}>IReporter</Text>
                
            </View>

            <View style={styles.segmentedControl}>
                <Button title="Red-Flag" onPress={() => setReportType('Red-Flag')}/>
                <Button title="Intervention" onPress={() => setReportType('Intervention')}/>
            </View>

            <View style={styles.toggleView}>
                <Text>List View</Text>
                <Switch value={viewMap} onValueChange={toggleView} />
                <Text>Map View</Text>
            </View>

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
    segmentedControl: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    toggleView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
      },


})

export default HomeScreen;
