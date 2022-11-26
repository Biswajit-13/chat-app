import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, Input, Button, Text } from "@rneui/base";
import { auth } from "../firebase";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageurl, setImageurl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({ headerBackTitle: "ABC" });
  }, [navigation]);

  const reg = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName:name,
          photoURL:imageurl || "https://img.freepik.com/free-vector/gradient-speech-therapy-logo_23-2149195563.jpg?w=740&t=st=1668701331~exp=1668701931~hmac=d156c507c020433baa1fa65a9fc4e68120a896946ce960d5b7cd5d1ba8ab978b",
          
        })
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>
        Create a account
      </Text>
      <View style={styles.inputcontainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          type="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Profile Picture Must be uploaded"
          type="text"
          value={imageurl}
          onChangeText={(text) => setImageurl(text)}
          onSubmitEditing={reg}
        />
      </View>
      <Button style={styles.button} raised onPress={reg} title="register" />
    </KeyboardAvoidingView>
  );
};

export default Register;

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
