import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = ({ route }) => {
  const Navigation = useNavigation();
  const RecieverData = route.params;
  console.log(RecieverData);
  const ImageUrl = RecieverData.RecieverData.Images;

  return (
    <View>
      <TouchableOpacity
        onPress={() => Navigation.navigate("Modal1", { url: ImageUrl })}
      >
        <Image
          source={{ uri: ImageUrl }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 100,
            marginTop: 50,
            alignSelf: "center",
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 20,
            backgroundColor: "white",
            marginVertical: 10,
            borderRadius: 30,
            padding: 10,
            width: "80%",
          }}
        >
          Friends:
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              textAlign: "center",
              color: "grey",
            }}
          >
            {RecieverData.RecieverData.Friends.length}
          </Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 20,
            backgroundColor: "white",
            marginVertical: 10,
            borderRadius: 30,
            padding: 10,
            width: "80%",
          }}
        >
          {RecieverData.RecieverData.Name}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 20,
            backgroundColor: "white",
            marginVertical: 10,
            borderRadius: 30,
            padding: 10,
            width: "80%",
            color: "grey",
          }}
        >
          {RecieverData.RecieverData.Gmail}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
