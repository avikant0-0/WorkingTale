import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { createClient } from "@sanity/client";
import axios from "axios";
import { UserType } from "../UserContext";
const client = createClient({
  projectId: "fzto7fg7",
  dataset: "production",
  apiVersion: "2021-08-29",
  token:
    "sk87B48NYZcdfkRULn7ZGcNjCs6uGruCKV4cZQ8RYrM0UNJJmxG7F7He42ohwYAlxXHiqenqZw4sw30DwYhLBIdsMekBLuXtj9syu5ivn0vMk6jrhu4dXr6xfBQmcz3IcmmVKrzWsfsUJG72pfhIavYunnCEpYyasDbcIsRwkbUWPF7bAZkl",
  useCdn: false,
});
const ProfileScreen = ({ route }) => {
  const Navigation = useNavigation();
  const [loading, setloading] = useState(false);
  let RecieverData = route.params;
  console.log("sdsddasd", RecieverData);
  // console.log(RecieverData.data);
  const ImageUrl = RecieverData.data.Images;
  console.log(RecieverData.data.Friends.length);
  const { urltohost } = useContext(UserType);
  UploadProfileImage = async () => {
    setloading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      // The user didn't cancel the operation, process the selected image
      const Result = result.assets[0].uri;
      console.log(result.assets[0].uri);
      const img = await fetch(Result);
      const bytes = await img.blob();
      client.assets
        .upload("image", bytes, { filename: "image" })
        .then((imageAsset) => {
          const doc = {
            _type: "imagelinks",
            mainImage: {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: imageAsset._id,
              },
            },
          };
          console.log(imageAsset.url);

          HandleSend("Image", imageAsset.url);
          client.create(doc).then((response) => {
            // console.log(response);
            if (response._createdAt) {
              console.log("Document created with ID:", response._id);
            } else {
              console.log("Error in uploading doc");
            }
          });
        });
    } else {
      setloading(false);
    }
    const id = RecieverData.data._id;
    HandleSend = async (MessageType, ImageUrl) => {
      console.log("KBSFID");
      const res = await axios.post(`${urltohost}/updateprofilepic`, {
        id,
        ImageUrl,
      });
      if (res.status === 200) {
        Navigation.navigate("Home");
        setloading(false);
      }
    };
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            "",
            "View Photo / Upload Photo",
            [
              {
                text: "View",
                onPress: () => Navigation.navigate("Modal1", { url: ImageUrl }),
                style: "cancel",
              },
              {
                text: "Upload",
                onPress: () => UploadProfileImage(),
              },
            ],
            { cancelable: true }
          )
        }
      >
        {loading ? (
          <Image
            source={{
              uri: "https://i.pinimg.com/originals/2e/60/07/2e60079f1e36b5c7681f0996a79e8af4.jpg",
            }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
              marginTop: 50,
              alignSelf: "center",
            }}
          />
        ) : (
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
        )}
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
            {RecieverData.data.Friends.length}
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
          {RecieverData.data.Name}
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
          {RecieverData.data.Gmail}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
