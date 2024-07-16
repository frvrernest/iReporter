import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Avatar, Button, Icon } from 'react-native-elements';

const HomeScreen = () => {
  const [selectedIssue, setSelectedIssue] = useState('in progress');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello User!</Text>
        <Avatar
          rounded
          source={{ }}
          size="medium"
        />
      </View>
      <Text style={styles.subtitle}>Issue Title</Text>
      <View style={styles.issueCard}>
        <Text style={styles.issueTitle}>❄️</Text>
        <Text style={styles.issueNumber}>Issue number: </Text>
        <View style={styles.issueStatusContainer}>
          <TouchableOpacity onPress={() => setSelectedIssue('pending')}>
            <Text style={[styles.issueStatus, selectedIssue === 'pending' && styles.issueStatusSelected]}>
              Pending
            </Text>
            <Text style={styles.issueTime}>08:21 AM</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedIssue('in progress')}>
            <Text style={[styles.issueStatus, selectedIssue === 'in progress' && styles.issueStatusSelected]}>
              In progress
            </Text>
            <Text style={styles.issueTime}>08:37 AM</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedIssue('completed')}>
            <Text style={[styles.issueStatus, selectedIssue === 'completed' && styles.issueStatusSelected]}>
              Completed
            </Text>
            <Text style={styles.issueTime}>09:00 AM</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.reportsTitle}>Reports from others</Text>
      <View style={styles.reportList}>
        {/* Repeat this View for each report item */}
        <View style={styles.reportItem}>
          <Text style={styles.reportTitle}> 🕳</Text>
          <Text style={styles.reportLocation}> </Text>
          <Text style={styles.reportDistance}>0.3km</Text>
        </View>
        <View style={styles.reportItem}>
          <Text style={styles.reportTitle}>❄️</Text>
          <Text style={styles.reportLocation}> </Text>
          <Text style={styles.reportDistance}>0.6km</Text>
        </View>
        <View style={styles.reportItem}>
          <Text style={styles.reportTitle}>⚠️</Text>
          <Text style={styles.reportLocation}> </Text>
          <Text style={styles.reportDistance}>1.5km</Text>
        </View>
      </View>
      <Button
        title="Show more"
        type="clear"
        titleStyle={styles.showMoreButton}
      />
      
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
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});

export default HomeScreen;
