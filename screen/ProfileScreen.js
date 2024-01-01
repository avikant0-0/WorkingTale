import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ProfileScreen = ({ route }) => {
  console.log(route.params);
  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
