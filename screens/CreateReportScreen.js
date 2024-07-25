import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import DatePicker from 'react-native-date-picker';
import { ReportsContext } from '../components/ReportsContext';

const CreateReportScreen = ({ navigation }) => {
  const [issue, setIssue] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date()); // Date picker state
  const [reportsCount, setReportsCount] = useState(0);
  const [fixedCount, setFixedCount] = useState(0);
  const [updatesCount, setUpdatesCount] = useState(0);
  const { addReport } = useContext(ReportsContext);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    // Simulate fetching data or any async operations
    setTimeout(() => {
      setReportsCount(19882);
      setFixedCount(40434);
      setUpdatesCount(9551007);
    }, 1000);
  }, []);

  const handleSubmit = () => {
    const newReport = {
      id: Date.now().toString(),
      issue,
      location,
      date: date.toLocaleDateString(), // Format date as string
    };
    addReport(newReport);
    Alert.alert('Success', 'Report submitted successfully');
    navigation.navigate('Home');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Report, view, or discuss local problems</Text>
      <Text style={styles.subTitle}>like graffiti, fly tipping, broken paving slabs, or street lighting</Text>

      <Text style={styles.label}>Enter a nearby location</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. RidgeWays, Kiambu Rd"
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
          onCancel={() => setShowDatePicker(false)}
        />
      )}

      <Text style={styles.stepsTitle}>How to report a problem</Text>
      <Text style={styles.steps}>1. Enter a nearby location</Text>
      <Text style={styles.steps}>2. Locate the problem on a map of the area</Text>
      <Text style={styles.steps}>3. Enter details of the problem</Text>
      <Text style={styles.steps}>4. We send it to the council on your behalf</Text>

      <View style={styles.statsContainer}>
        <Animatable.Text animation="fadeInUp" style={styles.stats}>{`${reportsCount} reports in past week`}</Animatable.Text>
        <Animatable.Text animation="fadeInUp" style={styles.stats}>{`${fixedCount} fixed in past month`}</Animatable.Text>
        <Animatable.Text animation="fadeInUp" style={styles.stats}>{`${updatesCount} updates on reports`}</Animatable.Text>
      </View>

      <Text style={styles.label}>Describe the issue</Text>
      <TextInput
        style={styles.textarea}
        placeholder="Describe the issue"
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
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  dateButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
  },
  dateButtonText: {
    color: '#333',
    textAlign: 'center',
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  steps: {
    fontSize: 16,
    marginBottom: 5,
  },
  statsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  stats: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  textarea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CreateReportScreen;
