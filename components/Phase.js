import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";
import Card from "./Card";
import Button from "./Button";
import { Button as RnButton } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Font from "react-native-vector-icons/FontAwesome";
import CardModal from "./CardModal";
import Drag from "./Drag";

const Phase = ({
  phase,
  onDelete,
  addCard,
  deleteCard,
  editCard,
  toggleCompletePhase,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [data, setData] = useState();
  const [checked, setChecked] = useState(true);
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{phase.title}</Text>
          <View style={styles.iconContainer}>
            <Pressable
              onPress={() => {
                toggleCompletePhase(phase.id);
              }}
              style={[styles.icon, { backgroundColor: "white" }]}>
              {phase.completed ? (
                <Font color={"green"} size={18} name="check" />
              ) : (
                <View style={{ height: 18, width: 18 }} />
              )}
            </Pressable>
            <Pressable onPress={onDelete} style={styles.icon}>
              <Icon color={"black"} size={18} name="delete" />
            </Pressable>
          </View>
        </View>

        <ScrollView>
          {phase.cards?.map((card) => (
           <Drag key={card.id}>
             <Card
              completed={phase.completed}
              onDelete={() => {
                deleteCard(card.id, phase.id);
              }}
              onEdit={() => {
                setEditModalVisible(true);
                setData(card);
              }}
              key={card.id}
              card={card}
            />
           </Drag>
          ))}
          {!phase.completed && (
            <Button
              onPress={() => setModalVisible(true)}
              title={"+ Add card"}
            />
          )}
        </ScrollView>
      </View>
      <Modal
        onRequestClose={() => setModalVisible(false)}
        transparent
        animationType="slide"
        visible={modalVisible}>
        <CardModal
          title={"Add Card"}
          onSuccess={(title, des) => {
            addCard(phase.id, title, des);
            setModalVisible(false);
          }}
          onClose={() => setModalVisible(false)}
        />
      </Modal>
      <Modal
        onRequestClose={() => setEditModalVisible(false)}
        transparent
        animationType="slide"
        visible={editModalVisible}>
        <CardModal
          data={data}
          title={"Edit Card"}
          onSuccess={(title, des) => {
            editCard(data?.id, phase.id, title, des);
            setEditModalVisible(false);
          }}
          onClose={() => setEditModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 300,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 30,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    backgroundColor: "#FB8383",
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderRadius: 2,
    marginLeft: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  option: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Phase;
