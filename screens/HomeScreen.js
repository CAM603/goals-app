import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import { getGoals, getSettings } from "../actions/goals";
import GoalInput from "../components/GoalInput";
import HeaderButton from "../components/HeaderButton";
import GoalList from "../components/GoalList";
import NoGoals from "../components/NoGoals";
import Container from "../components/Container";
import Colors from "../constants/Colors";

const HomeScreen = (props) => {
  const [isAdding, setIsAdding] = useState(false);

  let dispatch = useDispatch();

  const goals = useSelector((state) => state.goals.goals);
  const settings = useSelector((state) => state.goals.settings);
  const loading = useSelector((state) => state.goals.loading);
  const darkMode = useSelector((state) => state.goals.darkMode);
  console.log(settings);
  // let dark = settings.find((el) => el.setting === "Dark Mode");
  // dark.active === 0 ? console.log("zero") : console.log("one");

  useEffect(() => {
    dispatch(getGoals());
    dispatch(getSettings());
  }, []);

  useEffect(() => {
    props.navigation.setParams({ toggleAdding: toggleAdd });
  }, [toggleAdd]);

  useEffect(() => {
    props.navigation.setParams({ isDarkMode: darkMode });
  }, [darkMode]);

  const toggleAdd = () => {
    setIsAdding(!isAdding);
  };

  return (
    <Container style={styles.screen}>
      <GoalInput isAdding={isAdding} setIsAdding={setIsAdding} />
      {goals.length === 0 && !loading ? <NoGoals /> : <GoalList {...props} />}
    </Container>
  );
};

HomeScreen.navigationOptions = (navData) => {
  const isDarkMode = navData.navigation.getParam("isDarkMode");

  return {
    headerTitle: "My Goals",
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
          title="add"
          iconName="md-add-circle"
          onPress={navData.navigation.getParam("toggleAdding")}
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
});

export default HomeScreen;
