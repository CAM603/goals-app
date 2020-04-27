import React, { useState, useEffect } from "react";
import { View, Button, TextInput, Text, Modal, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import Container from "../components/Container";
import CustomText from "../components/CustomText";
import { addStep } from "../actions/goals";

const GoalDetailScreen = (props) => {
  const [isAdding, setIsAdding] = useState(false);
  const [enteredStep, setEnteredStep] = useState("");
  const goal = props.navigation.getParam("goal");
  const darkMode = useSelector((state) => state.goals.darkMode);
  const dispatch = useDispatch();
  console.log(goal);

  const toggleAdd = () => {
    setIsAdding(!isAdding);
  };

  const stepInputHandler = (text) => {
    setEnteredStep(text);
  };

  const cancelHandler = () => {
    setIsAdding(false);
    setEnteredStep("");
  };

  const addStepHandler = () => {
    if (!enteredStep) {
      return;
    }
    setIsAdding(false);
    dispatch(addStep(enteredStep, goal.id));
    setEnteredStep("");
  };

  useEffect(() => {}, []);

  return (
    <View style={styles.screen}>
      <Button title="add step" onPress={toggleAdd} />
      <Modal visible={isAdding} animationType="slide">
        <Container style={styles.inputContainer}>
          <TextInput
            placeholder="Step"
            style={[
              styles.input,
              {
                borderBottomColor: darkMode
                  ? Colors.dark.text
                  : Colors.light.text,
                color: darkMode ? Colors.dark.text : Colors.light.text,
              },
            ]}
            onChangeText={stepInputHandler}
            value={enteredStep}
            underlineColorAndroid="transparent"
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="CANCEL" color="red" onPress={cancelHandler} />
            </View>
            <View style={styles.button}>
              <Button title="ADD" onPress={addStepHandler} />
            </View>
          </View>
        </Container>
      </Modal>
    </View>
  );
};

GoalDetailScreen.navigationOptions = (navData) => {
  const isDarkMode = navData.navigation.getParam("darkMode");
  const goal = navData.navigation.getParam("goal");

  return {
    headerTitle: goal.goal,
    headerStyle: {
      backgroundColor: isDarkMode ? Colors.accent : Colors.light.bg,
      // shadowColor: "transparent",
    },
    headerTintColor: isDarkMode ? Colors.dark.text : Colors.light.text,
    headerTitleStyle: {
      fontFamily: "open-sans-bold",
    },
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="edit"
          iconName="ios-more"
          onPress={() => console.log("edit")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 2,
    padding: 5,
    width: "80%",
    marginBottom: 10,
    fontSize: 25,
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-between",
  },
  button: {
    width: 100,
  },
});

export default GoalDetailScreen;
