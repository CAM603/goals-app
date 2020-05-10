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

import DescriptionContainer from "../components/DescriptionContainer";
import CustomText from "../components/CustomText";
import CustomTextInput from "../components/CustomTextInput";
import { addDescription } from "../actions/goals";
import Colors from "../constants/Colors";

const Description = ({ goal }) => {
  const [editing, setEditing] = useState(false);
  const [words, setWords] = useState(goal.description);
  const dispatch = useDispatch();
  const toggle = () => {
    setEditing(!editing);
  };
  const handleEdit = () => {
    dispatch(addDescription(words, goal.id));
    setEditing(false);
  };
  const handleChange = (text) => {
    setWords(text);
  };

  return (
    <View style={styles.container}>
      {editing ? (
        <DescriptionContainer>
          <View style={styles.editContainer}>
            <TouchableOpacity onPress={handleEdit}>
              <CustomText style={styles.editText}>Update</CustomText>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <CustomTextInput
              style={styles.input}
              value={words}
              onChangeText={handleChange}
            />
          </View>
        </DescriptionContainer>
      ) : (
        <DescriptionContainer>
          <View style={styles.editContainer}>
            <TouchableOpacity onPress={toggle}>
              <CustomText style={styles.editText}>EDIT</CustomText>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <CustomText style={styles.descriptionText}>
              {words ? words : "Describe your goal!"}
            </CustomText>
          </View>
        </DescriptionContainer>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
    marginVertical: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 5,
  },
  descriptionText: {
    fontSize: 16,
    padding: 5,
  },
  editContainer: {
    alignItems: "flex-end",
  },
  editText: {
    fontWeight: "bold",
    paddingRight: 5,
  },
  inputContainer: {
    paddingHorizontal: 15,
  },
  input: {
    fontSize: 16,
    padding: 5,
  },
});

export default Description;
