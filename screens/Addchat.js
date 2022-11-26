import { StyleSheet, Text, View } from "react-native";
import React,{useLayoutEffect, useState} from "react";
import { Button, Input,Icon } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import { db } from "../firebase";

const Addchat = ({ navigation }) => {
const[input,setInput] = useState("");

  useLayoutEffect(() => {
navigation.setOptions({
    title:"Add a new chat",
    headerBackTitle:"chats",
});
  }, [navigation]);


  const createChat = async()=>{
    await db.collection('chats').add({
        chatName:input
    }).then(()=>{
        navigation.navigate('Home');
    }).catch((error)=>alert(error));
  }

  return (
    <View style={styles.container}>
   <Input placeholder="Enter a new chat" value={input} onChangeText={(text)=>setInput(text)} onSubmitEditing={createChat}
    leftIcon={
        <Icon name="wechat" type="antdesign" size={24} color="black"/>
    }
   />
   <Button onPress={createChat} title="create chat" />
    </View>
  );
};

export default Addchat;

const styles = StyleSheet.create({
  container: {
    backgroundColor:"white",
    padding:30,
    height:"100%"
  },
});
