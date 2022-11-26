import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Addchat from "./screens/Addchat";
import Chat from "./screens/Chat";

const stack = createStackNavigator();
const globalscreenoptions = {
  headerStyle: { backgroundColor: "#EB6440" },
  headerTitleStyle: { color: "#EFF5F5" },
  headerTintColor: "white",
};

export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator 
    //  initialRouteName="Home"
      screenOptions={globalscreenoptions}>
        <stack.Screen
          name="Login"
          component={Login}
          options={{ headerTitleAlign: "center" }}
        />
        <stack.Screen
          name="Register"
          component={Register}
          options={{ headerTitleAlign: "center" }}
        />
        <stack.Screen
          name="Home"
          component={Home}
          options={{ headerTitleAlign: "center" }}
        />
          <stack.Screen
          name="AddChat"
          component={Addchat}
          options={{ headerTitleAlign: "center" }}
        />
          <stack.Screen
          name="Chat"
          component={Chat}
          options={{ headerTitleAlign: "center" }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
