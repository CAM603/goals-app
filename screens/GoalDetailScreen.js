import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";

const GoalDetailScreen = (props) => {
  const goal = props.navigation.getParam("goal");
  const darkMode = useSelector((state) => state.goals.darkMode);

  useEffect(() => {
    props.navigation.setParams({ isDarkMode: darkMode });
    props.navigation.setParams({ goal: goal });
  }, []);

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
          { color: darkMode ? Colors.dark.text : Colors.light.text },
        ]}
      >
        {goal.goal}
      </Text>
    </View>
  );
};

GoalDetailScreen.navigationOptions = (navData) => {
  const isDarkMode = navData.navigation.getParam("isDarkMode");
  const goal = navData.navigation.getParam("goal");

  return {
    headerTitle: goal.goal,
    headerStyle: {
      backgroundColor: isDarkMode ? Colors.dark.bg : Colors.light.bg,
    },
    headerTintColor: isDarkMode ? Colors.dark.text : Colors.light.text,
    headerTitleStyle: {
      fontFamily: "open-sans-bold",
    },
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="add"
          iconName="md-add-circle"
          onPress={navData.navigation.getParam("toggleAdding")}
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
