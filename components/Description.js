import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";

import { addDescription } from "../actions/goals";

const Description = ({ goal }) => {
  const [editing, setEditing] = useState(false);
  const [words, setWords] = useState(goal.description);

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {editing ? (
        <View style={styles.description}>
          <TextInput
            style={{ fontSize: 16, padding: 5 }}
            placeholder="edit description"
            value={words}
            onChangeText={(text) => setWords(text)}
          />
          <Button
            title="Update"
            onPress={() => {
              dispatch(addDescription(words, goal.id));
              setEditing(false);
            }}
          />
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => setEditing(true)}
          style={styles.description}
        >
          <Text style={styles.descriptionText}>
            {goal.description ? words : "Describe your goal"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  description: {
    width: "90%",
    borderWidth: 3,
    borderColor: "black",
    height: 100,
  },
  descriptionText: {
    fontSize: 16,
    padding: 5,
  },
});

export default Description;
