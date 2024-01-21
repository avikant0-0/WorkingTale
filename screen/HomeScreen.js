import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import TaleLogo from "../images/TaleLogo.jpg";
import { Ionicons } from "@expo/vector-icons";
import { UserType } from "../UserContext";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Chats from "../components/Chats";
import { Feather } from "@expo/vector-icons";
const HomeScreen = () => {
  const { urltohost } = useContext(UserType);
  const Navigation = useNavigation();
  const { UserId, SetUserId } = useContext(UserType);

  useLayoutEffect(() => {
    Navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row" }}>
          <Image
            source={TaleLogo}
            style={{
              width: 45,
              height: 45,
              borderRadius: 100,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              fontSize: 30,
              fontWeight: 600,
              marginLeft: 5,
              marginTop: 5,
            }}
          >
            Tale
          </Text>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <MaterialIcons
            name="account-circle"
            size={30}
            color="black"
            onPress={() => Navigation.navigate("Load2")}
          />
          <View style={{ width: 20 }}></View>
          <Ionicons
            name="people-outline"
            size={30}
            color="black"
            onPress={() => Navigation.navigate("Friend")}
          />
          <View style={{ width: 20 }}></View>
          <Ionicons
            name="ios-search-circle"
            size={30}
            color="black"
            onPress={() => Navigation.navigate("Search")}
          />
          <View style={{ width: 20 }}></View>
          <Feather
            name="log-out"
            size={30}
            color="black"
            onPress={() => Logout()}
          />
        </View>
      ),
    });
  }, []);

  Logout = () => {
    async function removeItemValue(key) {
      try {
        await AsyncStorage.removeItem(key);
        console.log("Data removeds");
        return true;
      } catch (exception) {
        console.log(exception);
        return false;
      }
    }
    removeItemValue("AuthToken");
    Navigation.replace("Login");
  };

  const [Friends1, SetFriends] = useState([]);
  useEffect(() => {
    FetchData = async () => {
      try {
        const Token = await AsyncStorage.getItem("AuthToken");
        console.log("Token is", Token);
        SetUserId(Token);
        const response = await fetch(`${urltohost}/friends/${Token}`);
        let Data = await response.json();
        SetFriends(Data.friendsDetails);
        if (response.status === 200) {
          // console.log(Data.friendsDetails);
          console.log("REcieved friends dataa");
        }
      } catch (err) {
        console.log("Error In Homescreen.js:", err);
      }
    };
    FetchData();
  }, []);

  // console.log(Friends1);

  return (
    <ScrollView>
      <Pressable style={{ padding: 5 }}>
        <TouchableOpacity
          onPress={() => {
            FetchData();
          }}
          style={{
            alignSelf: "center",
            height: 35,
            width: 100,
            backgroundColor: "yellow",
            borderRadius: 25,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              marginTop: 7,
            }}
          >
            Refresh!!
          </Text>
        </TouchableOpacity>
        <Pressable>
          {Friends1.length > 0 ? (
            Friends1.map((item, index) => <Chats key={index} item={item} />)
          ) : (
            <View>
              <Text>Add Some New Friends To Get Started!</Text>
            </View>
          )}
        </Pressable>
      </Pressable>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
