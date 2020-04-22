import React from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";

const CustomText = (props) => {
  const darkMode = useSelector((state) => state.goals.darkMode);

  return (
    <Text
      style={[
        props.style,
        { color: darkMode ? Colors.dark.text : Colors.light.text },
      ]}
      onPress={props.onPress}
    >
      {props.children}
    </Text>
  );
};

export default CustomText;
