import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { ReportsContext } from '../components/ReportsContext';

const EditRecordScreen = ({ route, navigation }) => {
  const { reportId } = route.params;
  const { reports, updateReport } = useContext(ReportsContext);
  const [report, setReport] = useState(null);
  const [issue, setIssue] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const reportToEdit = reports.find(r => r.id === reportId);
    if (reportToEdit) {
      setReport(reportToEdit);
      setIssue(reportToEdit.issue);
      setLocation(reportToEdit.location);
      setDescription(reportToEdit.description);
    }
  }, [reportId, reports]);

  const handleSave = () => {
    const updatedReport = { ...report, issue, location, description };
    updateReport(updatedReport);
    navigation.goBack();
  };

  if (!report) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Issue</Text>
      <TextInput
        style={styles.input}
        value={issue}
        onChangeText={setIssue}
      />
      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Save" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditRecordScreen;
