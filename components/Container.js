import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";

const Container = (props) => {
  const darkMode = useSelector((state) => state.goals.darkMode);

  return (
    <View
      style={[
        props.style,
        { backgroundColor: darkMode ? Colors.dark.bg : Colors.light.bg },
      ]}
    >
      {props.children}
    </View>
  );
};

export default Container;