import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import CreateReportScreen from './screens/CreateReportScreen';
import EditRecordScreen from './screens/EditRecordScreen';
import { ReportsProvider } from './components/ReportsContext';
import PostedReportsScreen from './screens/PostedReportsScreen';  
import HomeScreen from './screens/HomeScreen';
import Login from './screens/LoginScreen';
import SIGNUP from './screens/SignupScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SIGNUP" component={SIGNUP} />  
      <Stack.Screen 
        name="PostedReports" 
        component={PostedReportsScreen} 
        options={{ headerShown: false }}  
      />
      <Stack.Screen 
        name="CreateReport" 
        component={CreateReportScreen} 
        options={{ title: 'Create Report' }} 
      />
      <Stack.Screen name="EditRecord" component={EditRecordScreen} />  
    </Stack.Navigator>
  );
}

function App() {
  return (
    <ReportsProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'CreateReport') {
                iconName = 'file-plus';
              }
              return <Icon name={iconName} type="feather" color={color} size={size} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#6200ea',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="CreateReport" component={CreateReportScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ReportsProvider>
  );
}

export default App;
