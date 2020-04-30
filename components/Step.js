import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { toggleCompleted } from "../actions/goals";

import CustomText from "../components/CustomText";

const Step = (props) => {
  const [completed, setCompleted] = useState(
    props.step.completed === 0 ? false : true
  );

  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleCompleted(props.step.id, props.goal.id));
    setCompleted(!completed);
  };

  return (
    <TouchableOpacity style={styles.stepContainer} onPress={toggle}>
      <CustomText
        style={[
          styles.step,
          {
            textDecorationLine: completed ? "line-through" : "none",
            textDecorationColor: "red",
          },
        ]}
      >
        {props.step.step}
      </CustomText>
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
