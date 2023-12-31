import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { React, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import TaleLogo from "../images/TaleLogo.jpg";
import axios from "axios";
import { UserType } from "../UserContext";

const RegisterScreen = () => {
  const { urltohost } = useContext(UserType);
  // console.log(urltohost);
  const [isLoading, setIsLoading] = useState(true);
  const [Name, SetName] = useState("");
  const [Gmail, SetGmail] = useState("");
  const [Password, SetPassword] = useState("");
  const Navigation = useNavigation();

  const HandleRegister = () => {
    const data = {
      Name: Name,
      Gmail: Gmail,
      Password: Password,
    };

    axios
      .post(`${urltohost}/register`, data)
      .then((res) => {
        // console.log(res);
        Alert.alert("Registred Successfully!", "Your account has been created");
        SetName("");
        SetGmail("");
        SetPassword("");
        Navigation.navigate("Login");
      })
      .catch((err) => {
        console.log("Error while registering:", err);
        Alert.alert("Registration Failed!", "Try Again!");
      });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={{ width: 100, height: 100, marginTop: 50 }}
          source={TaleLogo}
          borderRadius={100}
        />
        <KeyboardAvoidingView>
          <View style={{ marginTop: 30 }}>
            <Text style={{ color: "#4A55A2", fontSize: 45, fontWeight: "600" }}>
              Sign Up!
            </Text>
          </View>

          <View style={{ marginTop: 50 }}>
            <View>
              <Text
                style={{
                  marginRight: 200,
                  fontSize: 30,
                  fontWeight: "600",
                  color: "grey",
                }}
              >
                Name:
              </Text>
              <TextInput
                value={Name}
                onChangeText={(text) => SetName(text)}
                placeholder="Enter Your Name Here"
                style={{
                  marginTop: 10,
                  borderBottomWidth: 0.5,
                  borderBottomColor: "grey",
                  width: 300,
                }}
              ></TextInput>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  marginRight: 200,
                  fontSize: 30,
                  fontWeight: "600",
                  color: "grey",
                }}
              >
                Gmail:
              </Text>
              <TextInput
                value={Gmail}
                onChangeText={(text) => SetGmail(text)}
                placeholder="Enter Your Email Here"
                style={{
                  marginTop: 10,
                  borderBottomWidth: 0.5,
                  borderBottomColor: "grey",
                  width: 300,
                }}
              ></TextInput>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  marginRight: 200,
                  fontSize: 30,
                  fontWeight: "600",
                  color: "grey",
                }}
              >
                Password:
              </Text>
              <TextInput
                value={Password}
                onChangeText={(text) => SetPassword(text)}
                placeholder="Enter Your Password Here"
                style={{
                  marginTop: 10,
                  borderBottomWidth: 0.5,
                  borderBottomColor: "grey",
                  width: 300,
                }}
              ></TextInput>
            </View>

            <Pressable
              onPress={() => {
                HandleRegister();
                setIsLoading(false);
              }}
              style={{
                width: 100,
                backgroundColor: "#4A55A2",
                borderRadius: 10,
                padding: 12,
                marginTop: 100,
              }}
            >
              {isLoading ? (
                <Text
                  style={{
                    color: "white",
                    alignSelf: "center",
                    fontSize: 17.5,
                  }}
                >
                  Register!
                </Text>
              ) : (
                <Text
                  style={{
                    color: "white",
                    alignSelf: "center",
                    fontSize: 17.5,
                  }}
                >
                  Registering!
                </Text>
              )}
            </Pressable>

            <Pressable
              onPress={() => {
                Navigation.navigate("Login");
              }}
              style={{
                marginTop: 10,
                borderBottomWidth: 0.2,
                borderBottomColor: "grey",
                width: 164,
              }}
            >
              <Text style={{ color: "grey" }}>
                Already have an account?
                <Text>Login!</Text>
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({});
