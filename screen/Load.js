import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createClient } from "@sanity/client";
import { UserType } from "../UserContext";

import axios from "axios";

const client = createClient({
  projectId: "fzto7fg7",
  dataset: "production",
  apiVersion: "2021-08-29",
  token:
    "sk87B48NYZcdfkRULn7ZGcNjCs6uGruCKV4cZQ8RYrM0UNJJmxG7F7He42ohwYAlxXHiqenqZw4sw30DwYhLBIdsMekBLuXtj9syu5ivn0vMk6jrhu4dXr6xfBQmcz3IcmmVKrzWsfsUJG72pfhIavYunnCEpYyasDbcIsRwkbUWPF7bAZkl",
  useCdn: false,
});
// const socket = io.connect("http://192.168.127.73:3002");

const Load = () => {
  const { urltohost, seturltohost } = useContext(UserType);
  const { UserId } = useContext(UserType);
  const Navigation = useNavigation();
  useEffect(() => {
    client
      .fetch(
        `*[_type == "host"] |{
         "hostlink":hostlink
}`
      )
      .then((data) => {
        seturltohost(data[0].hostlink);

        Navigation.replace("Login");
      });
  }, []);

  useEffect(() => {}, []);
  return (
    <View style={{ marginTop: 150 }}>
      <Text>Loading...</Text>
    </View>
  );
};

export default Load;

const styles = StyleSheet.create({});
