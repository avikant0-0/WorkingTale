import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../UserContext";
import DisplayFriendRequests from "../components/DisplayFriendRequests";
const FriendsScreen = () => {
  useEffect(() => {
    FetchFriendRequests();
  }, []);
  const { UserId, SetUserId } = useContext(UserType);
  const { urltohost } = useContext(UserType);
  const [FriendArray, SetFriendArray] = useState([]);
  FetchFriendRequests = async () => {
    try {
      console.log(UserId);

      const Response = await fetch(
        `${urltohost}/recievefriendrequest/${UserId}`
      );
      const ResponseData = await Response.json();
      console.log(ResponseData);
      const FriendRequestData = ResponseData.map((item) => ({
        _id: item._id,
        Name: item.Name,
        Gmail: item.Gmail,
        Images: item.Images,
      }));
      SetFriendArray(FriendRequestData);

      if (Response.status === 200) {
        console.log(FriendRequestData);
      }
    } catch (err) {
      console.log("Error in FriendsScreen.js in FetchFriendFunction", err);
    }
  };

  // console.log(FriendArray);
  return (
    <View style={{ padding: 10 }}>
      {FriendArray.length > 0 ? (
        <View>
          {FriendArray.map((item, index) => (
            <DisplayFriendRequests
              key={index}
              item={item}
              FriendArray={FriendArray}
              SetFriendArray={SetFriendArray}
            />
          ))}
        </View>
      ) : (
        <Text>You Do Not Have Any New Requests</Text>
      )}
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({});
