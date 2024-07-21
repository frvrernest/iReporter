import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import CreateReportScreen from "./screens/CreateReportScreen";
import EditRecordScreen from "./screens/EditRecordScreen";
import { ReportsProvider } from "./components/ReportsContext";
import PostedReportsScreen from "./screens/PostedReportsScreen";
import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/LoginScreen";
import SIGNUP from "./screens/SignupScreen";

// Create stack and tab navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Function defining the Home stack navigator
function HomeStack() {
  return (
    <Stack.Navigator>
      {/* Define the Home screen in the stack navigator */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        // The header is hidden for the HomeScreen by setting headerShown to false.
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Login" component={Login} />

      <Stack.Screen name="SIGNUP" component={SIGNUP} />
      {/* Define the PostedReports screen in the stack navigator */}
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
      <Stack.Screen name="EditRecord" component={EditRecordScreen} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    // Wrap the navigation in the ReportsProvider to provide global state
    <ReportsProvider>
      <NavigationContainer>
        {/* Define the bottom tab navigator */}
        <Tab.Navigator
          // Define screen options for the tab navigator
          screenOptions={({ route }) => ({
            // Configure tab bar icons based on the route name
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = "home";
              } else if (route.name === "CreateReport") {
                iconName = "file-plus";
              }
              // Return the icon component from react-native-elements
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
          // Define tab bar appearance options
          tabBarOptions={{
            // Color of the active tab icon
            activeTintColor: "#6200ea",
            inactiveTintColor: "gray",
          }}
        >
          {/* 
            The Home tab uses the HomeStack navigator.
            The CreateReport tab directly uses the CreateReportScreen.
          */}
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen name="CreateReport" component={CreateReportScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ReportsProvider>
  );
}

export default App;
