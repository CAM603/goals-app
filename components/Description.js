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
          <TouchableOpacity
            style={{ alignItems: "flex-end" }}
            onPress={handleEdit}
          >
            <CustomText style={{ fontWeight: "bold" }}>Update</CustomText>
          </TouchableOpacity>
          <View>
            <CustomTextInput
              style={{ fontSize: 16, padding: 5, color: "white" }}
              value={words}
              onChangeText={handleChange}
              multiline={true}
              autoFocus={true}
            />
          </View>
        </DescriptionContainer>
      ) : (
        <DescriptionContainer>
          <TouchableOpacity style={{ alignItems: "flex-end" }} onPress={toggle}>
            <CustomText style={{ fontWeight: "bold" }}>EDIT</CustomText>
          </TouchableOpacity>
          <View>
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
    width: "100%",
    alignItems: "center",
  },
  descriptionText: {
    fontSize: 16,
    padding: 5,
  },
});

export default Description;
