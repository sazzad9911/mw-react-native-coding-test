import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const Card = ({ card, onDelete, onEdit, completed }) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: completed ? "#BCFAC5" : "#fff" },
      ]}>
      <View style={styles.box}>
        <Text style={styles.title}>{card.title}</Text>
        <Text style={styles.description}>{card.description}</Text>
        {card.date && (
          <Text style={styles.time}>{new Date(card.date).toUTCString()}</Text>
        )}
      </View>

      {!completed && (
        <Pressable onPress={onEdit} style={styles.icon}>
          <Icon color={"black"} size={18} name="edit" />
        </Pressable>
      )}
      {!completed && (
        <Pressable onPress={onDelete} style={[styles.icon, { marginLeft: 5 }]}>
          <Icon color={"red"} size={18} name="delete" />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: "#ffffff",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  box: {
    flex: 1,
    marginRight: 5,
    maxWidth: 220,
  },
  icon: {
    backgroundColor: "#e5e5e5",
    borderRadius: 15,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 16,
  },
  description: {
    fontSize: 12,
  },
  time: {
    fontSize: 10,
    color: "gray",
  },
});

export default Card;
