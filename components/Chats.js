import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Chats = ({ item }) => {
  const Navigation = useNavigation();
  // console.log("sdfdsfs", item);
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 10,
        paddingBottom: 5,
        backgroundColor: "white",
        borderRadius: 25,
      }}
      onPress={() =>
        Navigation.navigate("ChatScreen", {
          RecieverId: item._id,
          EncrytionString: item.encrytionstring,
        })
      }
    >
      <TouchableOpacity
        onPress={() => Navigation.navigate("Modal1", { url: item.Images })}
      >
        <Image
          source={{
            uri: item.Images,
          }}
          style={{ height: 50, width: 50, borderRadius: 25, marginTop: 1 }}
        />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>{item.Name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Chats;

const styles = StyleSheet.create({});
