import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { removeGoal } from "../actions/goals";
import Colors from "../constants/Colors";

const GoalItem = (props) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.goals.darkMode);

  return (
    <TouchableOpacity
      style={[
        styles.listItem,
        { borderBottomColor: darkMode ? Colors.dark.text : Colors.light.text },
      ]}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.title,
          { color: darkMode ? Colors.dark.text : Colors.light.text },
        ]}
      >
        {props.title}
      </Text>
      <Text onPress={() => dispatch(removeGoal(props.id))}>❌</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 5,
    marginVertical: 10,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default GoalItem;
