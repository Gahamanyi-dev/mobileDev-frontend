import React from "react";
import { Feather, AntDesign } from "react-native-vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

import { createStackNavigator } from "@react-navigation/stack";
import Dash from "../screens/Dash";



const Tab = createBottomTabNavigator();

const TabNavigation = ({ route }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#F7941D",
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
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Dash}
        options={() => ({
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name="Notifications"
        component={Dash}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="md-notifications-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={Dash}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="credit-card-scan-outline"
              size={size}
              color={color}
            />
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