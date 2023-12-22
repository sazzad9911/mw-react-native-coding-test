import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
  Text,
  Modal,
  Alert,
  View,
} from "react-native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Phase from "./components/Phase";
import phasesData from "./data/phases.json";
import Button from "./components/Button";
import PhaseModal from "./components/PhaseModal";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createStackNavigator();
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const App = () => {
  const [phases, setPhases] = useState(phasesData);
  const [modalVisible, setModalVisible] = useState(false);

  const random = () => Math.floor(Math.random() * 90000) + 10000;
  const addCard = (phaseId, title, description) => {
    try {
      let arr = [];
      phases.map((d) => {
        if (d.id === phaseId) {
          let cards = [];
          d.cards?.map((c) => {
            cards.push(c);
          });
          cards.push({
            id: random(),
            title: title,
            description: description,
          });
          arr.push({
            id: d.id,
            title: d.title,
            cards: cards,
          });
        } else {
          arr.push(d);
        }
      });
      setPhases(arr);
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const editCard = (cardId, phaseId, title, description) => {
    try {
      let arr = [];
      phases.map((d) => {
        if (d.id === phaseId) {
          let cards = [];
          d.cards?.map((c) => {
            if (c.id === cardId) {
              cards.push({ ...c, title: title, description: description });
            } else {
              cards.push(c);
            }
          });
          arr.push({
            id: d.id,
            title: d.title,
            cards: cards,
          });
        } else {
          arr.push(d);
        }
      });
      setPhases(arr);
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const addPhase = (e) => {
    setPhases((v) => [
      ...v,
      {
        id: random(),
        title: e,
      },
    ]);
    setModalVisible(false);
  };
  const deletePhase = (phaseId) => {
    setPhases(phases.filter((d) => d.id != phaseId));
  };
  const deleteCard = (cardId, phaseId) => {
    try {
      let arr = [];
      phases.map((d) => {
        if (d.id === phaseId) {
          let cards = d.cards?.filter((c) => c.id != cardId);
          arr.push({
            id: d.id,
            title: d.title,
            cards: cards,
          });
        } else {
          arr.push(d);
        }
      });
      setPhases(arr);
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const toggleCompletePhase = (phaseId) => {
    let arr = [];
    phases.map((d) => {
      if (d.id === phaseId) {
        let isComplete = d?.completed;
        arr.push({ ...d, completed: isComplete ? false : true });
      } else {
        arr.push(d);
      }
    });
    setPhases(arr);
  };
  const addTimeIntoCard = (cardId, phaseId) => {
    try {
      let arr = [];
      phases.map((d) => {
        if (d.id === phaseId) {
          let cards = [];
          d.cards?.map((c) => {
            if (c.id === cardId) {
              cards.push({ ...c, date: new Date() });
            } else {
              cards.push(c);
            }
          });
          arr.push({
            id: d.id,
            title: d.title,
            cards: cards,
          });
        } else {
          arr.push(d);
        }
      });
      setPhases(arr);
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const moveCard = (fromId, toId, cardId) => {
    try {
      let oldCard = {};
      let arr = [];
      phases.map((d) => {
        if (d.id === fromId) {
          oldCard = d.cards?.filter((c) => c.id === cardId)[0];
          let cards = d.cards?.filter((c) => c.id != cardId);
          arr.push({
            id: d.id,
            title: d.title,
            cards: cards,
          });
        } else {
          arr.push(d);
        }
      });
      setPhases(arr);
      let arr2 = [];
      phases.map((d) => {
        if (d.id === toId) {
          let cards = [];
          d.cards?.map((c) => {
            cards.push(c);
          });
          cards.push({
            id: oldCard?.id,
            title: oldCard?.title,
            description: oldCard?.description,
          });
          arr2.push({
            id: d.id,
            title: d.title,
            cards: cards,
          });
        } else {
          arr2.push(d);
        }
      });
      setPhases(arr2);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ImageBackground
        source={require("./assets/background.jpg")}
        style={styles.backgroundImage}
        resizeMode="stretch">
        <Text style={styles.title}>MW - TODO</Text>
        <ScrollView horizontal style={styles.container}>
          {phases.map((phase) => (
            <Phase
              addCard={addCard}
              deleteCard={deleteCard}
              onDelete={() => deletePhase(phase.id)}
              editCard={editCard}
              toggleCompletePhase={toggleCompletePhase}
              key={phase.id}
              phase={phase}
            />
          ))}
          <Button onPress={() => setModalVisible(true)} title={"+ Add phase"} />
        </ScrollView>
        <Modal
          onRequestClose={() => setModalVisible(false)}
          transparent
          animationType="slide"
          visible={modalVisible}>
          <PhaseModal
            onSuccess={addPhase}
            onClose={() => setModalVisible(false)}
          />
        </Modal>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 48,
    marginBottom: 6,
  },
  container: {
    margin: 5,
    gap: 10,
    marginRight: 16,
  },
  backgroundImage: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
