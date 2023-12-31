import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import HomeScreen from "./screen/HomeScreen";
import SearchScreen from "./screen/SearchScreen";
import FriendsScreen from "./screen/FriendsScreen";
import ChatScreen from "./screen/ChatScreen";
const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: true, title: "Search" }}
        />
        <Stack.Screen
          name="Friend"
          component={FriendsScreen}
          options={{ headerShown: true, title: "Friend Requests!" }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{ headerShown: true, title: "Messages" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
