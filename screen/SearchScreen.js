import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../UserContext";
import DisplayUsers from "../components/DisplayUsers";
const SearchScreen = () => {
  const { UserId, SetUserId } = useContext(UserType);
  const [User, SetUser] = useState([]);

  useEffect(() => {
    console.log("FetchedUsers");
    async function fetchData() {
      try {
        const response = await fetch(
          `https://weary-flannel-shirt-goat.cyclic.app/user/${UserId}`
        );
        const data = await response.json();
        SetUser(data);
      } catch (error) {
        console.log("SomeErrorInSearchScreenwhileRecievingUsers:", error);
      }
    }

    // Call the async function
    fetchData();
  }, []);

  console.log(User);
  return (
    <View>
      <View style={{ padding: 10 }}>
        {User.map((item, index) => (
          <DisplayUsers key={index} item={item} />
        ))}
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
