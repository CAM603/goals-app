import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

import { removeGoal } from "../actions/goals";

const GoalItem = (props) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity style={styles.listItem} activeOpacity={0.7}>
      <Text style={styles.title}>{props.title}</Text>
      <Text onPress={() => dispatch(removeGoal(props.id))}>❌</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 5,
    marginVertical: 10,
    borderBottomColor: "black",
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
