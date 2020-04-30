import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { toggleCompleted } from "../actions/goals";

const Step = (props) => {
  const [completed, setCompleted] = useState(
    props.step.completed === 0 ? false : true
  );
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={styles.stepContainer}
      onPress={() => {
        dispatch(toggleCompleted(props.step.id, props.goal.id));
        setCompleted(!completed);
      }}
    >
      <Text
        style={[
          styles.step,
          {
            textDecorationLine: completed ? "line-through" : "none",
          },
        ]}
      >
        {props.step.step}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  step: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Step;
