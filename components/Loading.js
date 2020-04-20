import React from "react";
import { StyleSheet } from "react-native";
import Container from "./Container";
import CustomText from "../components/CustomText";

const Loading = (props) => {
  return (
    <Container style={styles.container}>
      <CustomText style={styles.text}>Loading..</CustomText>
    </Container>
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
