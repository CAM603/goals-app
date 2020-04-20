import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import Container from "../components/Container";
import CustomText from "../components/CustomText";

const GoalDetailScreen = (props) => {
  const goal = props.navigation.getParam("goal");

  return (
    <Container style={styles.container}>
      <CustomText style={styles.text}>{goal.goal}</CustomText>
    </Container>
  );
};

GoalDetailScreen.navigationOptions = (navData) => {
  const isDarkMode = navData.navigation.getParam("darkMode");
  const goal = navData.navigation.getParam("goal");

  return {
    headerTitle: goal.goal,
    headerStyle: {
      backgroundColor: isDarkMode ? Colors.accent : Colors.light.bg,
      // shadowColor: "transparent",
    },
    headerTintColor: isDarkMode ? Colors.dark.text : Colors.light.text,
    headerTitleStyle: {
      fontFamily: "open-sans-bold",
    },
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="edit"
          iconName="ios-more"
          onPress={() => console.log("edit")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "open-sans",
    fontSize: 22,
  },
});

export default GoalDetailScreen;
