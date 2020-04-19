import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";

const Loading = () => {
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
          styles.text,
          {
            color: darkMode ? Colors.dark.text : Colors.light.text,
          },
        ]}
      >
        Loading...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
  },
});

export default Loading;
