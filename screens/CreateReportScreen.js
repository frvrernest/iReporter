import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { ReportsContext } from '../components/ReportsContext';

const CreateReportScreen = ({ navigation }) => {
  const [issue, setIssue] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [reportsCount, setReportsCount] = useState(0);
  const [fixedCount, setFixedCount] = useState(0);
  const [updatesCount, setUpdatesCount] = useState(0);
  const { addReport } = useContext(ReportsContext);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    // Simulate fetching data or any async operations
    setTimeout(() => {
      setReportsCount(82);
      setFixedCount(34);
      setUpdatesCount(100);
    }, 1000);
  }, []);

  const handleSubmit = () => {
    const newReport = {
      id: Date.now().toString(),
      issue,
      location,
      date: date.toLocaleDateString(),
    };
    addReport(newReport);
    Alert.alert('Success', 'Report submitted successfully');
    navigation.navigate('PostedReports');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Report, view, or discuss local problems</Text>
      <Text style={styles.subTitle}>"Like graffiti, fly tipping, broken paving slabs, or street lighting."</Text>

      <Text style={styles.label}>Issue Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the issue title"
        placeholderTextColor="#aaa"
        value={issue}
        onChangeText={setIssue}
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the location"
        placeholderTextColor="#aaa"
        value={location}
        onChangeText={setLocation}
      />
      <TouchableOpacity style={styles.button} onPress={() => console.log('Use current location')}>
        <Text style={styles.buttonText}>Use my current location</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Select the date of posting</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateButtonText}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DatePicker
          modal
          open={showDatePicker}
          date={date}
          mode="date"
          onConfirm={(selectedDate) => {
            setShowDatePicker(false);
            setDate(selectedDate);
          }}
          onCancel={() => {
            setShowDatePicker(false);
          }}
        />
      )}

      <Text style={styles.stepsTitle}>How to report a problem</Text>
      <Text style={styles.steps}>1. Enter a nearby location</Text>
      <Text style={styles.steps}>2. Locate the problem on a map of the area</Text>
      <Text style={styles.steps}>3. Enter details of the problem</Text>
      <Text style={styles.steps}>4. We send it to the council on your behalf</Text>

      <View style={styles.statsContainer}>
        <Text style={styles.stats}>{`${reportsCount} Reports in past week`}</Text>
        <Text style={styles.stats}>{`${fixedCount} Fixed in past month`}</Text>
        <Text style={styles.stats}>{`${updatesCount} Updates on reports`}</Text>
      </View>

      <Text style={styles.label}>Describe the issue</Text>
      <TextInput
        style={styles.textarea}
        placeholder="Describe the issue"
        placeholderTextColor="#aaa"
        value={issue}
        onChangeText={setIssue}
        multiline
      />


      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Issue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', 
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    color: '#ffffff', 
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#ffffff', 
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#1a1a1a',
    height: 40,
    borderWidth: 1,
    borderColor: '#666666',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#007BFF', // Blue color for button
    padding: 10,
    height: 40,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  dateButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#666666',
    marginBottom: 20,
  },
  dateButtonText: {
    color: '#ffffff', 
    textAlign: 'center',
  },
  stepsTitle: {
    color: '#ffffff', 
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  steps: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 5,
  },
  statsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  stats: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00FF00', // Green color for stats
    marginBottom: 5,
  },
  textarea: {
    height: 100,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#666666',
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
    color: '#ffffff', 
  },
  submitButton: {
    backgroundColor: '#FF4500',
    padding: 15,
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#ffffff', 
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CreateReportScreen;
