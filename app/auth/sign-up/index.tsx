import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../../configs/FirebaseConfig";

export default function SignUp() {
  const router = useRouter();
  const navigation = useNavigation();

  const [unhidePassword, setUnhidePassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const OnCreateAccount = () => {
    if (!fullName || !email || !password || !verifyPassword) {
      ToastAndroid.show("Please fill all the fields", ToastAndroid.TOP);
      return;
    }
    if (password !== verifyPassword) {
      ToastAndroid.show("Passwords do not match", ToastAndroid.TOP);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        if (errorCode === "auth/email-already-in-use") {
          ToastAndroid.show("Email is already in use", ToastAndroid.TOP);
        } else {
          ToastAndroid.show("Email or Password is not valid", ToastAndroid.TOP);
          console.log("Error creating account:", errorCode, errorMessage);
        }
        // ..
      });
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 40,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={30}></Ionicons>
      </TouchableOpacity>

      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
          marginTop: 20,
        }}
      >
        Create Your Account
      </Text>

      {/* user full name field */}
      <View
        style={{
          marginTop: 40,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit",
            marginBottom: 5,
            marginLeft: 5,
          }}
        >
          Full Name
        </Text>
        <TouchableOpacity style={styles.input}>
          <TextInput
            style={{ flex: 1, fontFamily: "outfit" }}
            placeholder="Enter Full Name"
            autoCapitalize="words"
            onChangeText={(value) => setFullName(value)}
          />
        </TouchableOpacity>
      </View>

      {/* email field */}
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit",
            marginBottom: 5,
            marginLeft: 5,
          }}
        >
          Email
        </Text>
        <View style={styles.input}>
          <TextInput
            style={{ flex: 1, fontFamily: "outfit" }}
            placeholder="Enter Email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(value) => setEmail(value)}
          />
        </View>
      </View>

      {/* password field */}
      <View
        style={{
          marginTop: 20,
        }}
      >
        <View style={{ flexDirection: "row", marginBottom: 5, marginLeft: 5 }}>
          <Text
            style={{
              fontFamily: "outfit",

              flex: 1,
            }}
          >
            Password
          </Text>
          <Text style={{ fontFamily: "outfit", color: Colors.GRAY }}>
            * Must be at least 6 characters long
          </Text>
        </View>
        <View style={styles.input}>
          <TextInput
            secureTextEntry={unhidePassword}
            style={{ flex: 1, fontFamily: "outfit" }}
            placeholder="Enter Password"
            autoCapitalize="none"
            onChangeText={(value) => setPassword(value)}
          />
          <TouchableOpacity onPress={() => setUnhidePassword(!unhidePassword)}>
            <Ionicons
              name={unhidePassword ? "eye-off" : "eye"}
              size={25}
              style={{ margin: "auto" }}
            ></Ionicons>
          </TouchableOpacity>
        </View>
      </View>

      {/* verify password field */}
      <View
        style={{
          marginTop: 20,
        }}
      >
        <View style={{ flexDirection: "row", marginBottom: 5, marginLeft: 5 }}>
          <Text
            style={{
              fontFamily: "outfit",

              flex: 1,
            }}
          >
            Verify Password
          </Text>
          <Text style={{ fontFamily: "outfit", color: Colors.GRAY }}>
            * Must be at least 6 characters long
          </Text>
        </View>
        <View style={styles.input}>
          <TextInput
            secureTextEntry={unhidePassword}
            style={{ flex: 1, fontFamily: "outfit" }}
            placeholder="Enter Password"
            autoCapitalize="none"
            onChangeText={(value) => setVerifyPassword(value)}
          />
          <TouchableOpacity onPress={() => setUnhidePassword(!unhidePassword)}>
            <Ionicons
              name={unhidePassword ? "eye-off" : "eye"}
              size={25}
              style={{ margin: "auto" }}
            ></Ionicons>
          </TouchableOpacity>
        </View>
      </View>

      {/* create account button */}
      <TouchableOpacity
        onPress={OnCreateAccount}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 50,
        }}
      >
        <Text
          style={{
            color: Colors.WHITE,
            textAlign: "center",
            fontFamily: "outfit-bold",
            fontSize: 25,
          }}
        >
          Create Account
        </Text>
      </TouchableOpacity>

      {/* sign in button */}
      <TouchableOpacity
        onPress={() => router.replace("/auth/sign-in")}
        style={{
          padding: 15,
          backgroundColor: Colors.WHITE,
          borderRadius: 15,
          marginTop: 20,
          borderWidth: 2,
        }}
      >
        <Text
          style={{
            color: Colors.PRIMARY,
            textAlign: "center",
            fontFamily: "outfit-bold",
            fontSize: 25,
          }}
        >
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    padding: 8,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.GRAY,
    fontFamily: "outfit",
  },
});
