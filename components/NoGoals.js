import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";

const NoGoals = () => {
  const darkMode = useSelector((state) => state.goals.darkMode);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? Colors.dark.bg : Colors.light.bg },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: darkMode ? Colors.dark.text : Colors.light.text,
          },
        ]}
      >
        0 Goals
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
});

export default NoGoals;
