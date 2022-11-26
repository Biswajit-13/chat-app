import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
// import {Image} from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { Image, Input, Button } from "@rneui/base";
import { auth } from "../firebase";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://img.freepik.com/free-vector/gradient-speech-therapy-logo_23-2149195563.jpg?w=740&t=st=1668701331~exp=1668701931~hmac=d156c507c020433baa1fa65a9fc4e68120a896946ce960d5b7cd5d1ba8ab978b",
        }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputcontainer}>
        <Input
          placeholder="Email"
          autoFocus
          type="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Button
        containerStyle={styles.button}
        title="Login"
        onPress={signIn}
        color="#EB6440"
      />
      <Button
        containerStyle={styles.button}
        type="outline"
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputcontainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
    color: "#EB6440",
  },
});
