import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
  Dimensions,
  Modal,
  Linking,
} from "react-native";
import { Avatar } from "react-native-elements";
import { ReportsContext } from "../components/ReportsContext";
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebaseConfig";
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const PostedReportsScreen = ({ navigation }) => {
  const { reports } = useContext(ReportsContext);
  const [serverReports, setServerReports] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState("in progress");
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const route = useRoute();
  const { firstName, profileImage, userId } = route.params || {};

  useEffect(() => {
    if (profileImage) {
      setImage(profileImage);
    }
  }, [profileImage]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("YOUR_API_ENDPOINT"); // Replace with your API endpoint
        const data = await response.json();
        setServerReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
        Alert.alert("Error", "Failed to fetch reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    const cameraPermission = await ImagePicker.getCameraPermissionsAsync();
    const galleryPermission = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (
      cameraPermission.status !== "granted" ||
      galleryPermission.status !== "granted"
    ) {
      Alert.alert(
        "Permissions Required",
        "This app needs camera and photo library permissions to update your profile picture.",
        [
          { text: "Open Settings", onPress: () => Linking.openSettings() },
          { text: "Cancel", style: "cancel" },
        ]
      );
    }
  };

  const requestGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "You've refused to allow this app to access your photos! Please go to settings and enable the permission.",
        [{ text: "OK", onPress: () => Linking.openSettings() }]
      );
      return false;
    }
    return true;
  };

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "You've refused to allow this app to access your camera! Please go to settings and enable the permission.",
        [{ text: "OK", onPress: () => Linking.openSettings() }]
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0]?.uri;
      if (!selectedImage) {
        console.error("No image URI found in the result object.");
        return;
      }
      console.log("Selected image from gallery:", selectedImage);
      setImage(selectedImage);
      saveImageToFirestore(selectedImage);
      hideModal();
    }
  };

  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0]?.uri;
      if (!selectedImage) {
        console.error("No image URI found in the result object.");
        return;
      }
      console.log("Selected image from camera:", selectedImage);
      setImage(selectedImage);
      saveImageToFirestore(selectedImage);
      hideModal();
    }
  };

  const saveImageToFirestore = async (imageUri) => {
    try {
      console.log("Saving image to Firestore:", { userId, imageUri });
      const userDocRef = doc(firestore, "users", userId);
      await updateDoc(userDocRef, { profileImage: imageUri });
      console.log("Profile image saved to Firestore:", imageUri);
    } catch (error) {
      console.error("Error saving image to Firestore:", error);
      Alert.alert("Error", "Failed to save profile image");
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const combinedReports = [...reports, ...serverReports];

  const handleScroll = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / (width * 0.8 + 20));
    setSelectedIssue(index);
  };

  const renderItem = ({ item }) => (
    <Animatable.View
      animation="slideInLeft"
      delay={600} 
      useNativeDriver
      style={styles.issueCard}
    >
      <Text style={styles.issueTitle}>{item.issue}</Text>
      <Text style={styles.issueNumber}>Issue number: {item.id}</Text>
      <View style={styles.issueStatusContainer}>
        {['pending', 'in progress', 'completed'].map(status => (
          <TouchableOpacity
            key={status}
            onPress={() => setSelectedIssue(status)}
          >
            <Text style={[
              styles.issueStatus,
              selectedIssue === status && styles.issueStatusSelected
            ]}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
            <Text style={styles.issueTime}>{item.date}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Animatable.View>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Hello {firstName}!</Text>
          <View style={styles.avatarContainer}>
            <Avatar
              rounded
              source={
                image
                  ? { uri: image }
                  : { uri: "https://www.example.com/path/to/avatar.jpg" }
              }
              size="medium"
              containerStyle={styles.avatar}
            />
            <TouchableOpacity
              style={styles.cameraIconContainer}
              onPress={showModal}
            >
              <Ionicons name="camera-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.subtitle}>Your Reports</Text>
        {combinedReports.length > 0 ? (
          <FlatList
            data={combinedReports}
            horizontal
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            snapToInterval={width * 0.8 + 20} 
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: 20 }}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          />
        ) : (
          <Text style={styles.noReportsText}>No reports available</Text>
        )}
        {/* <Text style={styles.reportsTitle}>Reports from others</Text> */}
        <FlatList
          data={serverReports}
          renderItem={({ item }) => (
            <View style={styles.reportItem}>
              <Text style={styles.reportTitle}>{item.issue}</Text>
              <Text style={styles.reportLocation}>{item.location}</Text>
              <Text style={styles.reportDate}>{item.date}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ReportDetails')}>
          <Text style={styles.addButtonText}>Past Reports</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={hideModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalButton} onPress={takePhoto}>
              <Ionicons name="camera" size={30} color="#000" />
              <Text style={styles.modalButtonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
              <Ionicons name="image" size={30} color="#000" />
              <Text style={styles.modalButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={hideModal}>
              <Ionicons name="close" size={30} color="#000" />
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40, 
    backgroundColor: '#000000', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    color: '#ffffff',
    paddingRight: 10,
    marginTop: 40,
    fontSize: 24,
    fontWeight: 'bold',
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#000",
    borderRadius: 15,
    padding: 5,
  },
  subtitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  issueCard: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    
    width: width * 0.8, 
    height: 150, 
    marginHorizontal: 10,
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
    color: '#ffffff',
  },
  reportItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  reportLocation: {
    fontSize: 14,
    color: '#555',
  },
  reportDate: {
    fontSize: 12,
    color: '#999',
  },
  addButton: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#000000',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  modalButtonText: {
    fontSize: 18,
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  loadingText: {
    fontSize: 18,
    color: '#ffffff',
  },
});

export default PostedReportsScreen;
