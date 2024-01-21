import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";
import { UserContext, UserType } from "../UserContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import io from "socket.io-client";
import { createClient } from "@sanity/client";
const client = createClient({
  projectId: "fzto7fg7",
  dataset: "production",
  apiVersion: "2021-08-29",
  token:
    "sk87B48NYZcdfkRULn7ZGcNjCs6uGruCKV4cZQ8RYrM0UNJJmxG7F7He42ohwYAlxXHiqenqZw4sw30DwYhLBIdsMekBLuXtj9syu5ivn0vMk6jrhu4dXr6xfBQmcz3IcmmVKrzWsfsUJG72pfhIavYunnCEpYyasDbcIsRwkbUWPF7bAZkl",
  useCdn: false,
});
const socket = io.connect("wss://websockettale.glitch.me");
const ChatScreen = () => {
  const [ShowEmoji, SetShowEmoji] = useState(false);
  const [Message, SetMessage] = useState("");
  const [SelectedImages, SetSelectedImages] = useState("");
  const { UserId } = useContext(UserType);
  const [SelectedMessages, SetSelectedMessages] = useState([]);
  const Route = useRoute();
  const { RecieverId } = Route.params;
  const { EncrytionString } = Route.params;
  const { urltohost } = useContext(UserType);
  const Navigation = useNavigation();
  const [imagevisible, setimagevisible] = useState(false);
  const ScrollViewRef = useRef(null);
  useEffect(() => {
    scrollToBottom();
  }, []);
  const scrollToBottom = () => {
    if (ScrollViewRef.current) {
      ScrollViewRef.current.scrollToEnd({ animated: false });
    }
  };
  const handleContentSizeChange = () => {
    scrollToBottom();
  };
  const HandleEmojiPress = () => {
    SetShowEmoji(!ShowEmoji);
  };

  const HandleSend = async (MessageType, ImageUrl) => {
    try {
      if (MessageType === "Text" && Message !== "") {
        const Response = await axios.post(`${urltohost}/messageslol`, {
          SenderId: UserId,
          RecieverId: RecieverId,
          MessageType: "Text",
          MessageText: Message,
        });
        socket.emit("message_sent", { EncrytionString });
        getmessages();
        SetMessage("");
        SetSelectedImages("");
      }
      if (MessageType === "Image") {
        const Response = await axios.post(`${urltohost}/messageslol`, {
          SenderId: UserId,
          RecieverId: RecieverId,
          MessageType: "Image",
          ImageUrl: ImageUrl,
        });
        SetMessage("");
        SetSelectedImages("");

        socket.emit("message_sent", { EncrytionString });
        getmessages();
      }
    } catch (err) {
      console.log("Error In ChatScreen.js", err);
    }
  };
  useEffect(() => {
    getmessages();
    socket.emit("join_room", { EncrytionString });
  }, []);
  useEffect(() => {
    socket.on("recieve_message", (data) => {
      getmessages();
      console.log("SDUHISD");
    });
  }, [socket]);

  const [RecieverData, SetRecieverData] = useState([]);
  //For showing reciever data in headers
  useEffect(() => {
    const FetchRecieverData = async () => {
      try {
        const Response = await fetch(`${urltohost}/othersender/${RecieverId}`);
        const Data = await Response.json();
        // console.log(Data);
        SetRecieverData(Data);
      } catch (err) {
        console.log("Error in Chatscreen.js in FetchRecieverData", err);
      }
    };
    FetchRecieverData();
  }, []);
  //For showing reciever data in headers
  useLayoutEffect(() => {
    Navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity pressDuration={0}>
            <AntDesign
              name="caretleft"
              size={24}
              color="black"
              onPress={() => Navigation.navigate("Home")}
            />
          </TouchableOpacity>
          {SelectedMessages.length > 0 ? (
            <View>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {SelectedMessages.length}
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  Navigation.navigate("Modal1", { url: RecieverData.Images })
                }
              >
                <Image
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: 25,
                    resizeMode: "cover",
                    marginHorizontal: 5,
                  }}
                  source={{ uri: RecieverData.Images }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => Navigation.navigate("Profile", { RecieverData })}
              >
                <Text
                  style={{
                    marginHorizontal: 5,
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {RecieverData.Name}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ),
      headerRight: () =>
        SelectedMessages.length > 0 ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="md-arrow-redo-sharp" size={24} color="black" />
            <Ionicons name="md-arrow-undo" size={24} color="black" />
            <FontAwesome name="star" size={24} color="black" />
            <MaterialIcons
              onPress={() => DeleteMessages(SelectedMessages)}
              name="delete"
              size={24}
              color="black"
            />
          </View>
        ) : null,
    });
  }, [RecieverData, SelectedMessages]);
  // console.log(RecieverData);

  //For fetching messages
  const [forload, setforload] = useState("");

  const [FetchedMessages, SetFetchedMessages] = useState([]);

  const getmessages = async () => {
    try {
      const Response = await fetch(
        `${urltohost}/fetchmessages/${UserId}/${RecieverId}`
      );
      const Data = await Response.json();
      if (Response.status === 200) {
        SetFetchedMessages(Data);
        // console.log(Data);
      }
    } catch (err) {
      console.log("error in funcn getmessages", err);
    }
  };

  const tempuserid = UserId.slice(1, -1);
  const FormatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // The user didn't cancel the operation, process the selected image
      const Result = result.assets[0].uri;
      // console.log(result.assets[0].uri);
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
          // console.log(imageAsset.url);

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
    }
  };

  //To selected Messages
  const HandleLongPress = (message) => {
    //Check if the message is already selected

    const IsSelected = SelectedMessages.includes(message._id);
    // console.log(SelectedMessages);
    if (IsSelected) {
      SetSelectedMessages((previousMessages) =>
        previousMessages.filter((id) => id !== message._id)
      );

      // SetSelectedMessages([]);
    } else {
      SetSelectedMessages((previousMessages) => [
        ...previousMessages,
        message._id,
      ]);
      // console.log(SelectedMessages);
    }
  };

  // To Delete Messages
  const DeleteMessages = async (SelectedMessages) => {
    try {
      const Response = await axios.post(`${urltohost}/DeleteMessages`, {
        SelectedMessages: SelectedMessages,
      });
      if (Response.status === 200) {
        SetSelectedMessages((prevSelectedMessages) =>
          prevSelectedMessages.filter((id) => !SelectedMessages.includes(id))
        );
        getmessages();
      } else {
        console.log("Error Deletion Of Messages LMAO");
      }
    } catch (error) {
      console.log("error in function deletemessages", error);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
      <ScrollView
        ref={ScrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        onContentSizeChange={handleContentSizeChange}
      >
        {FetchedMessages.length > 0 ? (
          FetchedMessages.map((item, idx) => {
            if (item.MessageType === "Text") {
              const IsSelected = SelectedMessages.includes(item._id);
              return (
                <Pressable
                  onLongPress={() => HandleLongPress(item)}
                  key={idx}
                  style={[
                    item.SenderId._id === tempuserid
                      ? {
                          alignSelf: "flex-end",
                          backgroundColor: "#DCF8C6",
                          padding: 10,
                          maxWidth: "60%",
                          borderRadius: 7,
                          margin: 5,
                        }
                      : {
                          alignSelf: "flex-start",
                          backgroundColor: "white",
                          borderRadius: 7,
                          maxWidth: "60%",
                          padding: 10,
                          margin: 5,
                        },

                    IsSelected && { width: "100%", backgroundColor: "#F0FFFF" },
                  ]}
                >
                  <Text style={{ fontSize: 15, textAlign: "left" }}>
                    {item.Message}
                  </Text>
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 10,
                      color: "grey",
                      marginTop: 2,
                    }}
                  >
                    {FormatTime(item.TimeStamp)}
                  </Text>
                </Pressable>
              );
            }
            if (item.MessageType === "Image") {
              const IsSelected = SelectedMessages.includes(item._id);
              return (
                <Pressable
                  key={idx}
                  style={[
                    item.SenderId._id === tempuserid
                      ? {
                          alignSelf: "flex-end",
                          backgroundColor: "#DCF8C6",
                          padding: 10,
                          maxWidth: "60%",
                          borderRadius: 7,
                          margin: 15,
                        }
                      : {
                          alignSelf: "flex-start",
                          backgroundColor: "white",
                          borderRadius: 7,
                          maxWidth: "60%",
                          padding: 10,
                          margin: 15,
                        },
                    IsSelected && { width: "100%", backgroundColor: "#F0FFFF" },
                  ]}
                >
                  <Pressable
                    pressDuration={0}
                    onPress={() =>
                      Navigation.navigate("Modal1", { url: item.ImageUrl })
                    }
                    onLongPress={() => HandleLongPress(item)}
                  >
                    <Image
                      source={{
                        uri: item.ImageUrl,
                      }}
                      style={{ width: 200, height: 200, borderRadius: 10 }}
                    />
                  </Pressable>
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 10,
                      color: "grey",
                      marginTop: 2,
                    }}
                  >
                    {FormatTime(item.TimeStamp)}
                  </Text>
                </Pressable>
              );
            }
          })
        ) : (
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "grey",
              textAlign: "center",
              marginTop: "50%",
            }}
          >
            Send a Hi! to start a Conversation!!
          </Text>
        )}
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          borderTopWidth: 1,
          borderTopColor: "grey",
        }}
      >
        <Entypo
          name="emoji-happy"
          size={24}
          color="black"
          style={{ marginHorizontal: 5 }}
          onPress={() => HandleEmojiPress()}
        />
        <TextInput
          placeholder="Message"
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "grey",
            borderRadius: 20,
            paddingHorizontal: 20,
            marginHorizontal: 5,
            marginBottom: 5,
          }}
          value={Message}
          onChangeText={(text) => SetMessage(text)}
        />
        <TouchableOpacity pressDuration={0}>
          <FontAwesome
            name="photo"
            size={24}
            color="black"
            style={{ marginHorizontal: 5 }}
            onPress={() => PickImage()}
          />
        </TouchableOpacity>
        <Feather
          name="mic"
          size={24}
          color="black"
          style={{ marginHorizontal: 5 }}
        />
        <Pressable
          style={{
            marginHorizontal: 5,
            padding: 5,
            borderRadius: 20,
            backgroundColor: "#007bff",
            width: 60,
          }}
        >
          <TouchableOpacity
            pressDuration={0}
            onPress={() => HandleSend("Text")}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
                fontSize: 17,
              }}
            >
              Send
            </Text>
          </TouchableOpacity>
        </Pressable>
      </View>
      {ShowEmoji && (
        <EmojiSelector
          style={{ height: 250 }}
          onEmojiSelected={(emoji) => {
            SetMessage((prevMess) => prevMess + emoji);
          }}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
