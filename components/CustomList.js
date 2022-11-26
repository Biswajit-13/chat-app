import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar, ListItem } from "@rneui/themed";
const CustomList = ({id,chatName,enterChat}) => {
  return (
    <ListItem onPress={()=>enterChat(id,chatName)} key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri: "https://images.unsplash.com/photo-1589816365021-a76a9422f6a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{fontWeight:'800'}}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            Eat food from canteen and drink water!
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomList;

const styles = StyleSheet.create({});
