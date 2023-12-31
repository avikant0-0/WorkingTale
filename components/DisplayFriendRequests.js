import { Image, Pressable, StyleSheet, Text } from "react-native";
import React, { useContext } from "react";
import axios from "axios";
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";

const DisplayFriendRequests = ({ item, FriendArray, SetFriendArray }) => {
  console.log(item);
  const Navigation = useNavigation();
  const { UserId, SetUserId } = useContext(UserType);
  const { urltohost } = useContext(UserType);
  console.log(UserId);
  AcceptRequest = async (SenderId) => {
    const RecieverId = UserId;
    try {
      const Response = await axios.post(`${urltohost}/acceptfriendrequests`, {
        SenderId: SenderId,
        RecieverId: RecieverId,
      });
      SetFriendArray(FriendArray.filter((request) => request._id !== SenderId));

      if (Response.status === 200) {
        console.log("Success in DisokayFriendRequest");

        Navigation.navigate("Home");
      }
    } catch (err) {
      console.log("Error in DisplayFriendRequest.js", err);
    }
  };

  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Image
        source={{
          uri: item.Images,
        }}
        style={{ width: 50, height: 50, borderRadius: 25, margin: 10 }}
      />
      <Text style={{ fontWeight: "bold", flex: 1 }}>
        {item.Name} Sent You A Friend Request!
      </Text>

      <Pressable
        onPress={() => AcceptRequest(item._id)}
        style={{
          backgroundColor: "yellow",
          height: 50,
          marginRight: 20,
          width: 100,
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            marginTop: 17,
            fontSize: 15,
            fontWeight: "600",
          }}
        >
          Accept
        </Text>
      </Pressable>
    </Pressable>
  );
};

export default DisplayFriendRequests;

const styles = StyleSheet.create({});
