import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Step = ({ step }) => {
  console.log("props", step);
  return (
    <View>
      <View>
        <Text>{step.step}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Step;
