import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Heatmap } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [heatmapPoints, setHeatmapPoints] = useState([]);

  useEffect(() => {
    // Request location permission and get current location
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    };

    requestLocationPermission();
    
    // Dummy data for heatmap points, replace with your actual data
    setHeatmapPoints([
      { latitude: 37.78825, longitude: -122.4324, weight: 1 },
      { latitude: 37.78825, longitude: -122.4358, weight: 1 },
      { latitude: 37.78925, longitude: -122.4344, weight: 1 },
      { latitude: 37.78925, longitude: -122.4344, weight: 1 },
      { latitude: 37.78925, longitude: -122.4344, weight: 1 },
      { latitude: 37.78925, longitude: -122.4344, weight: 1 },
      { latitude: 37.78925, longitude: -122.4344, weight: 1 },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={location}
        >
          <Heatmap 
            points={heatmapPoints} 
            radius={50}
            opacity={0.7}
            gradient={{
              colors: ['#00FF00', '#FF0000'],
              startPoints: [0.2, 0.5],
              colorMapSize: 256
            }}
          />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;
