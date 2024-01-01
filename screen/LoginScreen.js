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
import { React, useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import TaleLogo from "../images/TaleLogo.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [Gmail, SetGmail] = useState("");
  const [Password, SetPassword] = useState("");
  const Navigation = useNavigation();
  const { urltohost } = useContext(UserType);
  let Token = "";
  useEffect(() => {
    const CheckLoginStatus = async () => {
      let Token = await AsyncStorage.getItem("AuthToken");
      try {
        if (Token) {
          Navigation.replace("Home");
          console.log(Token);
        }
      } catch (err) {
        console.log("Some error in async function in LoginScreen.js:", err);
      }
    };
    CheckLoginStatus();
  }, []);

  const HandleLogin = () => {
    const User = {
      Gmail: Gmail,
      Password: Password,
    };
    if (Gmail === "" || Password === "") {
      Alert.alert("Login Error!", "Please enter Gmail And Password!!");
    } else {
      axios
        .post(`${urltohost}/login`, User)
        .then((res) => {
          console.log(res);

          console.log(res.data);
          if (res.data.Token) {
            Token = res.data.Token;
            AsyncStorage.setItem("AuthToken", Token);
            Navigation.replace("Home");
          } else if (res.data.Message) {
            setIsLoading(true);
            Alert.alert("Login Error!", res.data.Message);
          }
        })
        .catch((err) => {
          Alert.alert(`Login Error`, err);
          console.log("Error Login!", err);
        });
    }
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
          <View style={{ marginTop: 50 }}>
            <Text style={{ color: "#4A55A2", fontSize: 45, fontWeight: "600" }}>
              Sign In!
            </Text>
          </View>

          <View style={{ marginTop: 60 }}>
            <View>
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
                placeholder="Enter Your Gmail Here"
                style={{
                  marginTop: 10,
                  borderBottomWidth: 0.5,
                  borderBottomColor: "grey",
                  width: 300,
                }}
              ></TextInput>
            </View>
          </View>
          <View style={{ marginTop: 40 }}>
            <View>
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
                HandleLogin();
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
                  Login!
                </Text>
              ) : (
                <Text
                  style={{
                    color: "white",
                    alignSelf: "center",
                    fontSize: 17.5,
                  }}
                >
                  Logging in!
                </Text>
              )}
            </Pressable>

            <Pressable
              onPress={() => {
                Navigation.navigate("Register");
              }}
              style={{
                marginTop: 20,
                borderBottomWidth: 0.2,
                borderBottomColor: "grey",
                width: 159,
              }}
            >
              <Text style={{ color: "grey" }}>
                Don't have an account?
                <Text>Signup!</Text>
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
