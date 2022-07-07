import React from "react";
import { Feather, AntDesign } from "react-native-vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

import { createStackNavigator } from "@react-navigation/stack";
import Dash from "../screens/Dash";
import Login from "../screens/Login";

const Stack = createStackNavigator();

const HomeStack = () =>{
    return (
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen
          name="Dashboard"
          component={Dash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={Login}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }


const Tab = createBottomTabNavigator();

const TabNavigation = ({ route }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#307A59",
        tabBarInactiveTintColor: "#000000",
        tabBarStyle: {
          borderTopWidth: 0,
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          backgroundColor: "#fff",
          position: "absolute",
          height:60
        },
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
            marginTop: 5,
            marginBottom: 5,
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={() => ({
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name="Timer"
        component={Dash}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="back-in-time" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Dash}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="cart-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;