import SpriteAnimator from "@/components/SpriteAnimation";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../../configs/FirebaseConfig";

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [unhidePassword, setUnhidePassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onSignIn = () => {
    if (!email || !password) {
      ToastAndroid.show("Please fill all the fields", ToastAndroid.TOP);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        router.replace("/mytrip");
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        ToastAndroid.show("Email or Password is incorrect", ToastAndroid.TOP);
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

      <View style={{ alignItems: "center" }}>
        <SpriteAnimator
          source={require("../../../assets/images/Idle.png")}
          frameWidth={32}
          frameCount={10}
          scale={3}
          frameDuration={100}
        />
      </View>

      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
          marginTop: 10,
          textAlign: "center",
        }}
      >
        Let&apos;s Sign You In
      </Text>

      {/* <Text style={{ fontFamily: "outfit-bold", fontSize: 30, marginTop: 20 }}>
        Let&apos;s Sign You In
      </Text>

      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
          color: Colors.GRAY,
          marginTop: 20,
        }}
      >
        Welcome Back
      </Text>

      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
          color: Colors.GRAY,
          marginTop: 10,
        }}
      >
        You&apos;ve been missed!
      </Text> */}

      {/* email field */}
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
        <Text
          style={{
            fontFamily: "outfit",
            marginBottom: 5,
            marginLeft: 5,
          }}
        >
          Password
        </Text>
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

      {/* sign in button */}
      <TouchableOpacity
        onPress={onSignIn}
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
          Sign In
        </Text>
      </TouchableOpacity>

      {/* create account button */}
      <TouchableOpacity
        onPress={() => router.replace("/auth/sign-up")}
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
          Create Account
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
