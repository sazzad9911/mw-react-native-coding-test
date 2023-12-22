import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import Button from "./Button";
import Icon from "react-native-vector-icons/AntDesign";

export default function CardModal({ title, onSuccess, onClose,data }) {
  const [text, setText] = useState(data?.title);
  const [description, setDescription] = useState(data?.description);
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.headline}>{title ? title : "Add Phase"}</Text>
        <TextInput
          value={text}
          onChangeText={setText}
          style={styles.input}
          placeholder="Title"
        />
        <Text style={styles.errorText}>*Can not be empty</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          style={[styles.input,{marginTop:0}]}
          placeholder="Description"
        />
        <Text style={styles.errorText}>*Can not be empty</Text>
        <Button
          onPress={() => {
            description&&text&&onSuccess && onSuccess(text,description);
          }}
          title={"Done"}
        />
        <Pressable onPress={onClose} style={styles.icon}>
          <Icon color={"black"} size={25} name="closecircleo" />
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.50)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: "white",
    width: "80%",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
  },
  headline: {
    fontSize: 18,
    textAlign: "center",
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  errorText:{
    color:"red",
    marginBottom:10
  },
  icon: {
    position: "absolute",
    right: 0,
    height: 30,
    width: 30,
    borderRadius: 15,

    justifyContent: "center",
    alignItems: "center",
  },
});
