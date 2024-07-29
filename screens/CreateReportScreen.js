import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Image,
  ScrollView,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { ReportsContext } from "../components/ReportsContext";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Video } from "expo-av";
import * as Animatable from "react-native-animatable";

const CreateReportScreen = ({ navigation }) => {
  // State variables
  const [issue, setIssue] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [reportsCount, setReportsCount] = useState(0);
  const [fixedCount, setFixedCount] = useState(0);
  const [updatesCount, setUpdatesCount] = useState(0);
  const { addReport } = useContext(ReportsContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [reportCategory, setReportCategory] = useState("Red-Flag");
  const [priority, setPriority] = useState("Low");
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setReportsCount(82);
      setFixedCount(34);
      setUpdatesCount(100);
    }, 1000);
  }, []);

  const handleUseMyLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Permission to access location was denied"
      );
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const coords = `${location.coords.latitude}, ${location.coords.longitude}`;
    setSelectedLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setLocation(coords);
    setShowMap(true);
  };

  const handleMapPress = (e) => {
    setSelectedLocation(e.nativeEvent.coordinate);
    const coords = `${e.nativeEvent.coordinate.latitude}, ${e.nativeEvent.coordinate.longitude}`;
    setLocation(coords);
  };

  const pickMedia = async (type) => {
    let result;
    if (type === "image") {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });
    }

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
      setMediaType(type);
    }
  };

  const handleSubmit = () => {
    const newReport = {
      id: Date.now().toString(),
      issue,
      location: selectedLocation
        ? `${selectedLocation.latitude}, ${selectedLocation.longitude}`
        : location,
      date: date.toLocaleDateString(),
      category: reportCategory,
      priority,
      media,
      mediaType,
    };
    addReport(newReport);
    Alert.alert("Success", "Report submitted successfully");
    navigation.navigate("PostedReports");
  };

  return (
    <Animatable.View animation="fadeInUpBig" style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Instructions */}
        <Animatable.Text animation="fadeInDown" style={styles.title}>
          Report, view, or discuss local problems
        </Animatable.Text>
        <Animatable.Text animation="fadeInDown" delay={100} style={styles.subTitle}>
          "Like graffiti, fly tipping, broken paving slabs, or street lighting."
        </Animatable.Text>

        {/* Form */}
        <View>
          <Text style={styles.label}>1. Choose the category of the problem</Text>
          <Picker
            selectedValue={reportCategory}
            style={styles.picker}
            onValueChange={(itemValue) => setReportCategory(itemValue)}
          >
            <Picker.Item label="Red-Flag" value="Red-Flag" />
            <Picker.Item label="Intervention" value="Intervention" />
          </Picker>
        </View>
        <View>
          <Text style={styles.label}>2. Choose the priority of the problem</Text>
          <Picker
            selectedValue={priority}
            style={styles.picker}
            onValueChange={(itemValue) => setPriority(itemValue)}
          >
            <Picker.Item label="Low" value="Low" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="High" value="High" />
          </Picker>
        </View>
        <Text style={styles.label}>3. Enter a nearby location</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. RidgeWays, Kiambu Rd"
          placeholderTextColor="#aaa"
          value={location}
          onChangeText={setLocation}
        />
        <TouchableOpacity style={styles.button} onPress={handleUseMyLocation}>
          <Text style={styles.buttonText}>Use my current location</Text>
        </TouchableOpacity>

        <Text style={styles.label}>4. Select the date of posting</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateButtonText}>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>

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

        <Text style={styles.label}>5. Describe the issue</Text>
        <TextInput
          style={styles.textarea}
          placeholder="Describe the issue"
          placeholderTextColor="#aaa"
          value={issue}
          onChangeText={setIssue}
          multiline
        />

        {/* Media upload */}
        <View style={styles.mediaButtonsContainer}>
          <TouchableOpacity
            style={styles.mediaButton}
            onPress={() => pickMedia("image")}
          >
            <Ionicons name="camera" size={24} color="white" />
            <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mediaButton}
            onPress={() => pickMedia("video")}
          >
            <Ionicons name="videocam" size={24} color="white" />
            <Text style={styles.buttonText}>Upload Video</Text>
          </TouchableOpacity>
        </View>
        {media && mediaType === "image" && (
          <Animatable.Image
            animation="fadeIn"
            source={{ uri: media }}
            style={styles.image}
          />
        )}
        {media && mediaType === "video" && (
          <Video
            source={{ uri: media }}
            style={styles.video}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        )}

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <Text
            style={styles.stats}
          >{`${reportsCount} Reports in past week`}</Text>
          <Text
            style={styles.stats}
          >{`${fixedCount} Fixed in past month`}</Text>
          <Text
            style={styles.stats}
          >{`${updatesCount} Updates on reports`}</Text>
        </View>

        {/* Submit button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Issue</Text>
        </TouchableOpacity>

        {/* Map modal */}
        <Modal visible={showMap} animationType="slide">
          <View style={styles.mapContainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: selectedLocation
                  ? selectedLocation.latitude
                  : 37.78825,
                longitude: selectedLocation
                  ? selectedLocation.longitude
                  : -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onPress={handleMapPress}
            >
              {selectedLocation && <Marker coordinate={selectedLocation} />}
            </MapView>
            <TouchableOpacity
              style={styles.mapButton}
              onPress={() => setShowMap(false)}
            >
              <Text style={styles.mapButtonText}>Confirm Location</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#BB86FC",
    marginBottom: 10,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 18,
    color: "#BB86FC",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    color: "#E0E0E0",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#1E1E1E",
    height: 40,
    borderWidth: 1,
    borderColor: "#666666",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#ffffff",
  },
  picker: {
    backgroundColor: "#1E1E1E",
    color: "#ffffff",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#03DAC5",
    padding: 10,
    height: 40,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#000000",
    textAlign: "center",
  },
  dateButton: {
    backgroundColor: "#03DAC5",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#666666",
    marginBottom: 20,
  },
  dateButtonText: {
    color: "#000000",
    textAlign: "center",
  },
  statsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  stats: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#03DAC5",
    marginBottom: 5,
    textAlign: "center",
  },
  textarea: {
    height: 100,
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "#666666",
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlignVertical: "top",
    marginBottom: 20,
    color: "#ffffff",
  },
  submitButton: {
    backgroundColor: "#FF0266",
    padding: 15,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
  },
  mediaButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  mediaButton: {
    backgroundColor: "#03DAC5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    width: "48%",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  video: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  mapButton: {
    backgroundColor: "#03DAC5",
    padding: 10,
    borderRadius: 5,
    margin: 20,
  },
  mapButtonText: {
    color: "#000000",
    textAlign: "center",
  },
});

export default CreateReportScreen;
