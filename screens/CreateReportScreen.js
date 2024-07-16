import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';

const CreateReportScreen = () => {
  const [category, setCategory] = useState(null);
  const [location, setLocation] = useState({
    latitude: 49.981636,
    longitude: 19.944382,
  });
  const [priority, setPriority] = useState('Low');

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handlePriorityChange = (selectedPriority) => {
    setPriority(selectedPriority);
  };

  const handleSubmit = () => {
    // Handle submit logic here
    console.log('Report submitted');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Report an Issue</Text>
      <View style={styles.imageContainer}>
        {/* Replace with an actual image picker */}
        <Text style={styles.imagePlaceholder}>Image Placeholder</Text>
      </View>
      <Text style={styles.label}>Issue category</Text>
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={[styles.categoryButton, category === 'Ice on the road' && styles.categoryButtonSelected]}
          onPress={() => handleCategoryChange('Ice on the road')}
        >
          <Text style={styles.categoryButtonText}>Ice on the road</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryButton, category === 'Hole in the road' && styles.categoryButtonSelected]}
          onPress={() => handleCategoryChange('Hole in the road')}
        >
          <Text style={styles.categoryButtonText}>Hole in the road</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryButton, category === 'Other' && styles.categoryButtonSelected]}
          onPress={() => handleCategoryChange('Other')}
        >
          <Text style={styles.categoryButtonText}>Other</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Issue location</Text>
      {/* // map placement */}
      <TouchableOpacity onPress={() => console.log('Change location')}>
        <Text style={styles.changeLocationText}>Change</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Issue priority</Text>
      <View style={styles.priorityContainer}>
        <TouchableOpacity
          style={[styles.priorityButton, priority === 'Low' && styles.priorityButtonSelected]}
          onPress={() => handlePriorityChange('Low')}
        >
          <Text style={styles.priorityButtonText}>Low</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.priorityButton, priority === 'Medium' && styles.priorityButtonSelected]}
          onPress={() => handlePriorityChange('Medium')}
        >
          <Text style={styles.priorityButtonText}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.priorityButton, priority === 'High' && styles.priorityButtonSelected]}
          onPress={() => handlePriorityChange('High')}
        >
          <Text style={styles.priorityButtonText}>High</Text>
        </TouchableOpacity>
      </View>
      <Button title="Submit issue" onPress={handleSubmit} buttonStyle={styles.submitButton} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    height: 200,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePlaceholder: {
    color: '#aaa',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: '#ffeb3b',
  },
  categoryButtonText: {
    fontSize: 14,
  },
  map: {
    height: 200,
    marginBottom: 10,
  },
  changeLocationText: {
    color: '#1e90ff',
    marginBottom: 20,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priorityButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  priorityButtonSelected: {
    backgroundColor: '#ffeb3b',
  },
  priorityButtonText: {
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#6200ea',
  },
});

export default CreateReportScreen;
