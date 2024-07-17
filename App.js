import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './src/screens/HomeScreen';
import Login from './src/screens/LoginScreen';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    
    </NavigationContainer>
  );
}


