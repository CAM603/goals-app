import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { addGoal } from "../actions/goals";
import Container from "../components/Container";
import Colors from "../constants/Colors";

const GoalInput = (props) => {
  const [enteredGoal, setEnteredGoal] = useState("");
  const darkMode = useSelector((state) => state.goals.darkMode);
  const dispatch = useDispatch();

  const goalInputHandler = (text) => {
    setEnteredGoal(text);
  };

  const addGoalHandler = () => {
    if (!enteredGoal) {
      return;
    }
    props.setIsAdding(false);
    dispatch(addGoal(enteredGoal));
    setEnteredGoal("");
  };

  const cancelHandler = () => {
    props.setIsAdding(false);
    setEnteredGoal("");
  };

  return (
    <Modal visible={props.isAdding} animationType="slide">
      <Container style={styles.inputContainer}>
        <TextInput
          placeholder="Goal"
          style={[
            styles.input,
            {
              borderBottomColor: darkMode
                ? Colors.dark.text
                : Colors.light.text,
              color: darkMode ? Colors.dark.text : Colors.light.text,
            },
          ]}
          onChangeText={goalInputHandler}
          value={enteredGoal}
          underlineColorAndroid="transparent"
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="CANCEL" color="red" onPress={cancelHandler} />
          </View>
          <View style={styles.button}>
            <Button title="ADD" onPress={addGoalHandler} />
          </View>
        </View>
      </Container>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default GoalInput;
