// App.js
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateReportScreen from './screens/CreateReportScreen';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name="CreateRecord" component={CreateReportScreen } />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
