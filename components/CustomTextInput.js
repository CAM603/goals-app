import React from "react";
import { TextInput } from "react-native";
import { useSelector } from "react-redux";

import Colors from "../constants/Colors";

const CustomTextInput = (props) => {
  const darkMode = useSelector((state) => state.goals.darkMode);

  return (
    <TextInput
      onChangeText={props.onChangeText}
      value={props.value}
      autoFocus={true}
      underlineColorAndroid="transparent"
      multiline={true}
      style={[
        props.style,
        {
          color: darkMode ? Colors.dark.text : Colors.light.text,
          borderBottomColor: darkMode ? Colors.dark.text : Colors.light.text,
        },
      ]}
    />
  );
};

export default CustomTextInput;
