import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from './screens/DashboardScreen';

const Stack =createStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        
        <Stack.Screen name='Admin' component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;