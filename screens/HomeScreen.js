import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { ReportsContext } from '../components/ReportsContext';

const HomeScreen = ({ navigation }) => {
  const { reports } = useContext(ReportsContext);
  const [selectedIssue, setSelectedIssue] = useState('in progress');
  const [latestReport, setLatestReport] = useState(null);

  useEffect(() => {
    if (reports.length > 0) {
      setLatestReport(reports[reports.length - 1]);
    }
  }, [reports]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello User!</Text>
        <Avatar
          rounded
          source={{ uri: 'https://www.example.com/path/to/avatar.jpg' }}
          size="medium"
        />
      </View>
      {latestReport ? (
        <>
          <Text style={styles.subtitle}>Issue Title</Text>
          <View style={styles.issueCard}>
            <Text style={styles.issueTitle}>{latestReport.issue}</Text>
            <Text style={styles.issueNumber}>Issue number: {latestReport.id}</Text>
            <View style={styles.issueStatusContainer}>
              <TouchableOpacity onPress={() => setSelectedIssue('pending')}>
                <Text style={[styles.issueStatus, selectedIssue === 'pending' && styles.issueStatusSelected]}>
                  Pending
                </Text>
                <Text style={styles.issueTime}>{latestReport.time}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedIssue('in progress')}>
                <Text style={[styles.issueStatus, selectedIssue === 'in progress' && styles.issueStatusSelected]}>
                  In progress
                </Text>
                <Text style={styles.issueTime}>{latestReport.time}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedIssue('completed')}>
                <Text style={[styles.issueStatus, selectedIssue === 'completed' && styles.issueStatusSelected]}>
                  Completed
                </Text>
                <Text style={styles.issueTime}>{latestReport.time}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <Text style={styles.noReportsText}>No reports available</Text>
      )}
      <Text style={styles.reportsTitle}>Reports from others</Text>
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.reportItem}>
            <Text style={styles.reportTitle}>{item.issue}</Text>
            <Text style={styles.reportLocation}>{item.location}</Text>
          </View>
        )}
      />
      <Button
        title="Show more"
        type="clear"
        titleStyle={styles.showMoreButton}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateReport')}
      >
        <Text style={styles.addButtonText}>Add New Report</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  issueCard: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  issueTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  issueNumber: {
    color: '#bbb',
    fontSize: 12,
    marginBottom: 15,
  },
  issueStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  issueStatus: {
    color: '#bbb',
    fontSize: 12,
    textAlign: 'center',
  },
  issueStatusSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  issueTime: {
    color: '#bbb',
    fontSize: 10,
    textAlign: 'center',
  },
  noReportsText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 20,
    textAlign: 'center',
  },
  reportsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reportList: {
    marginBottom: 20,
  },
  reportItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reportLocation: {
    fontSize: 14,
    color: '#555',
  },
  reportDistance: {
    fontSize: 12,
    color: '#999',
  },
  showMoreButton: {
    color: '#6200ea',
  },
  addButton: {
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
