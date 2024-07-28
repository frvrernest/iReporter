import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import CreateReportScreen from "./screens/CreateReportScreen";
import { ReportsProvider } from "./components/ReportsContext";
import PostedReportsScreen from "./screens/PostedReportsScreen";
import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/LoginScreen";
import SIGNUP from "./screens/SignupScreen";
import EditRecordScreen from "./screens/EditRecordScreen";
import ReportDetailsScreen from "./screens/ReportDetailsScreen";
import MapScreen from "./screens/MapScreen"; 
import SettingsScreen from "./screens/SettingsScreen"; 
import FloatingButton from "./components/FloatingButton"; 

// Create stack and tab navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Function defining the Home stack navigator
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
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
        options={{ title: "Create Report" }}
      />
      <Stack.Screen name="ReportDetails" component={ReportDetailsScreen} />
      <Stack.Screen name="EditRecord" component={EditRecordScreen} />
    </Stack.Navigator>
  );
}

function MyReportsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My Reports"
        component={PostedReportsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReportDetails"
        component={ReportDetailsScreen}
        options={{ title: "Report Details" }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <ReportsProvider>
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                  iconName = 'home';
                } else if (route.name === 'My Reports') {
                  iconName = 'file-text';
                } else if (route.name === 'Map') {
                  iconName = 'map';
                } else if (route.name === 'Settings') {
                  iconName = 'settings';
                } else if (route.name === 'CreateReport') {
                  iconName = 'camera';
                }
                return (
                  <Icon
                    name={iconName}
                    type="feather"
                    color={color}
                    size={size}
                  />
                );
              },
            })}
            tabBarOptions={{
              backgroundColor: '#333', 
              activeTintColor: "#6200ea",
              inactiveTintColor: "black",
            }}
          >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="My Reports" component={MyReportsStack} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
          <FloatingButton />
        </View>
      </NavigationContainer>
    </ReportsProvider>
  );
};

export default App;