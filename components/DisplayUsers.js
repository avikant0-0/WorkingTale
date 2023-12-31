import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../UserContext";
import axios from "axios";

const DisplayUsers = ({ item }) => {
  const { UserId, SetUserId } = useContext(UserType);
  const [RequestSent, SetRequestSent] = useState(false);
  const [FriendRequest, SetFriendRequest] = useState([]);
  const { urltohost } = useContext(UserType);
  const [UserFriends, SetUserFriends] = useState([]);
  const SendFriendRequest = async (CurrentUserId, SelectedUserId) => {
    try {
      const Response = await axios.post(`${urltohost}/friendrequests`, {
        CurrentUserId: CurrentUserId,
        SelectedUserId: SelectedUserId,
      });
    } catch (err) {
      console.log(
        "Error in function SendrequestFuntion in DisplayUsers.js:",
        err
      );
    }

    if (Response.status === 200) {
      SetRequestSent(true);
    }
  };
  const FetchFriendsRequests = async (req, res) => {
    try {
      const response = await axios.get(
        `${urltohost}/friend-request/sent/${UserId}`
      );
      const data = response.data;
      SetFriendRequest(data);
      if (response.status === 200) {
        console.log("FriendRequestDataRecieved");
      } else {
        console.log("Error in friend-request/sent");
      }
    } catch (error) {
      console.log("Error in FetchFriendsRequests", error);
    }
  };
  const FetchUserFriends = async (req, res) => {
    try {
      const response = await axios.get(`${urltohost}/friendss/${UserId}`);

      const data = await response.data;
      SetUserFriends(data);
      if (response.status === 200) {
        console.log("Fetching Friend Request");
      }
    } catch (error) {
      console.log("Error in FetchUserFriends", error);
    }
  };
  useEffect(() => {
    FetchFriendsRequests();
    FetchUserFriends();
  }, []);

  // console.log("Friend Request Sent", FriendRequest);
  // console.log("UserFriends", UserFriends);
  const [pressed, setpressed] = useState(false);
  return (
    <Pressable
      style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
    >
      <View>
        <Image
          source={{
            uri: item.Images,
          }}
          style={{ width: 50, height: 50, borderRadius: 25, margin: 10 }}
        />
      </View>
      <View style={{ marginLeft: 5, flex: 1 }}>
        <Text style={{ fontSize: 20, fontWeight: "600" }}>{item.Name}</Text>
        <Text style={{ fontSize: 15, color: "grey" }}>{item.Gmail}</Text>
      </View>
      {UserFriends.includes(item._id) ? (
        <Pressable
          style={{
            backgroundColor: "yellow",
            height: 50,
            marginRight: 20,
            width: 100,
            borderRadius: 20,
          }}
        >
          <Text
            style={{ alignSelf: "center", marginTop: 15, fontWeight: "600" }}
          >
            Friends
          </Text>
        </Pressable>
      ) : FriendRequest.length > 0 &&
        FriendRequest.some((friends) => friends._id === item._id) ? (
        <Pressable
          style={{
            backgroundColor: "yellow",
            height: 50,
            marginRight: 20,
            width: 100,
            borderRadius: 20,
          }}
          onPress={() => setpressed(true)}
        >
          <Text
            style={{ alignSelf: "center", marginTop: 15, fontWeight: "600" }}
          >
            {pressed ? <Text>Sent Request</Text> : <Text> Request Sent </Text>}
          </Text>
        </Pressable>
      ) : (
        <Pressable
          style={{
            backgroundColor: "yellow",
            height: 50,
            marginRight: 20,
            width: 100,
            borderRadius: 20,
          }}
          onPress={() => {
            SendFriendRequest(UserId, item._id);
            // setforload("Start");
            setpressed(true);
          }}
        >
          <Text
            style={{ alignSelf: "center", marginTop: 15, fontWeight: "600" }}
          >
            {pressed ? <Text>Sent Request</Text> : <Text> Add Friend </Text>}
          </Text>
        </Pressable>
      )}
    </Pressable>
  );
};

export default DisplayUsers;

const styles = StyleSheet.create({});
