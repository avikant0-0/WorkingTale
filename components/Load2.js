import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";

const Load2 = () => {
  const { urltohost } = useContext(UserType);
  let Token = "";
  const Navigation = useNavigation(UserType);
  useEffect(() => {
    const gettoken = async () => {
      let Token = await AsyncStorage.getItem("AuthToken");

      let data = await axios.get(
        `${urltohost}/othersender/${Token.slice(1, -1)}`
      );
      try {
        if (Token) {
          data = data.data;
          console.log("TOHKEEN IS", data.Friends);
          Navigation.replace("UpdateProfilePage", { data });
        }
      } catch (err) {
        console.log("Some error in async function in Load2.js:", err);
      }
    };
    gettoken();
  }, []);

  return (
    <View style={{ marginTop: 150 }}>
      <Text>Loading......</Text>
    </View>
  );
};

export default Load2;

const styles = StyleSheet.create({});
