import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Avatar } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { auth, db } from "../firebase";
import * as firebase from "firebase";

const Chat = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "chat",
      headerTitleAlign: "left",
      headerBackTitleVisible: false,
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{
              uri: "https://images.unsplash.com/photo-1589816365021-a76a9422f6a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
            }}
          />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity>
            <Feather name="video" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="phone-call" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  const sendmessage = () => {
    Keyboard.dismiss();
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    setInput("");
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp","desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map(doc=> ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, [route]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        behavior="padding,height"
        style={styles.container}
        keyboardVerticalOffset={90}
      >
      <></>
        <ScrollView contentContainerStyle={{paddingTop:15}}>
          {messages.map(({ id, data }) =>
            data.email === auth.currentUser.email ? (
              <View key={id} style={styles.receiver}>
                <Avatar
                  source={{
                    uri: data.photoURL,
                  }}
                />
                <Text style={styles.receivertext}>{data.message}</Text>
              </View>
            ) : (
              <View style={styles.sender}>
                <Avatar />
                <Text style={styles.sendertext}>{data.message}</Text>
              </View>
            )
          )}
        </ScrollView>
        <View style={styles.footers}>
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            onSubmitEditing={sendmessage}
            style={styles.input}
            placeholder="signal message"
          />
          <TouchableOpacity onPress={sendmessage} activeOpacity={0.5}>
            <Ionicons name="send" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footers: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  input: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,

    backgroundColor: "yellow",

    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  receiver: {
    padding: 15,
    backgroundColor: "yellow",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "blue",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  receivertext: {},
});
