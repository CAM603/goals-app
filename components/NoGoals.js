import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NoGoals = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>0 Goals</Text>
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
