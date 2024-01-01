import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { useNavigation } from "@react-navigation/native";
const Modal1 = ({ route }) => {
  let url = route.params;
  url = url.url;
  const Navigation = useNavigation();
  return (
    <Modal visible={true} transparent={true}>
      <ImageViewer imageUrls={[{ url }]} />
      <Pressable
        style={{
          position: "absolute",
          height: 40,
          width: 40,
          top: 60,
          right: 10,
        }}
        onPress={() => Navigation.goBack()}
      >
        <Text
          style={{
            color: "white",
            backgroundColor: "black",
            alignSelf: "center",
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          X
        </Text>
      </Pressable>
    </Modal>
  );
};

export default Modal1;

const styles = StyleSheet.create({});
