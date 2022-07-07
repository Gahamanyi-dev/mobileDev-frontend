import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../screens/Register";
import Login from "../screens/Login";
import Dash from "../screens/Dash";
import TabNavigation from "./TabNavigation";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dash}
          options={{ headerShown: false }}
        />
              <Stack.Screen name="TabNavigation" component={TabNavigation} options={{headerShown: false}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
