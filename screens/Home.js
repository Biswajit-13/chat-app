import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import CustomList from "../components/CustomList";
import { Avatar } from "@rneui/themed";
import { auth, db } from "../firebase";
import { AntDesign } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const signout = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerStyle: { backgroundColor: "white" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 10 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={signout}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
            alignItems: "center",
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddChat")}
            activeOpacity={0.5}
          >
            <AntDesign name="adduser" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (id,chatName)=>{
    navigation.navigate("Chat",{
      id,
      chatName,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
      {chats.map(({id,data:{chatName}}) =>(
        <CustomList key={id} id={id} chatName={chatName} enterChat={enterChat}/>
      ))} 
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
container:{
  height:"100%",
  flex:1,
}
});
