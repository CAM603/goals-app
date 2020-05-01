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
          <View style={{ alignItems: "center", backgroundColor: "grey" }}>
            <CustomText style={styles.title}>
              Describe your goal of {goal.goal}
            </CustomText>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity onPress={handleEdit}>
              <CustomText style={{ fontWeight: "bold" }}>Update</CustomText>
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <CustomTextInput
              style={{ fontSize: 16, padding: 5, color: "white" }}
              value={words}
              onChangeText={handleChange}
            />
          </View>
        </DescriptionContainer>
      ) : (
        <DescriptionContainer>
          <View style={{ alignItems: "center", backgroundColor: "grey" }}>
            <CustomText style={styles.title}>
              Describe your goal to {goal.goal}
            </CustomText>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity onPress={toggle}>
              <CustomText style={{ fontWeight: "bold", paddingRight: 5 }}>
                EDIT
              </CustomText>
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 10 }}>
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
  title: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 5,
  },
  descriptionText: {
    fontSize: 16,
    padding: 5,
  },
});

export default Description;
