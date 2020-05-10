import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";

const DescriptionContainer = (props) => {
  const darkMode = useSelector((state) => state.goals.darkMode);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: darkMode ? Colors.dark.bg : Colors.light.bg,
          borderWidth: 3,
          borderRadius: 5,
          borderColor: darkMode ? Colors.dark.text : Colors.light.text,
        },
      ]}
    >
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

export default DescriptionContainer;
