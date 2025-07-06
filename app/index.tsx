import { auth } from "@/configs/FirebaseConfig";
import { Redirect } from "expo-router";
import { View } from "react-native";
import Login from "./../components/Login";

export default function Index() {
  const user = auth.currentUser;
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {user ? <Redirect href={"/mytrip"} /> : <Login />}
    </View>
  );
}
