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
import Load from "./screen/Load";
import ProfileScreen from "./screen/ProfileScreen";
import Modal1 from "./components/Modal";
import UpdateProfilePage from "./screen/UpdateProfilePage";
import Load2 from "./components/Load2";
const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Load"
          component={Load}
          options={{ headerShown: false }}
        />
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
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: true, title: "Profile Page" }}
        />
        <Stack.Screen
          name="Modal1"
          component={Modal1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateProfilePage"
          component={UpdateProfilePage}
          options={{ headerShown: true, title: "Update Your Profile " }}
        />
        <Stack.Screen
          name="Load2"
          component={Load2}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
