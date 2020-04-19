import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import { getGoals } from "../actions/goals";
import GoalInput from "../components/GoalInput";
import HeaderButton from "../components/HeaderButton";
import GoalList from "../components/GoalList";
import NoGoals from "../components/NoGoals";
import Colors from "../constants/Colors";

const HomeScreen = (props) => {
  const [isAdding, setIsAdding] = useState(false);
  // let darkMode = settings.find((el) => el.setting === "Dark Mode");
  // darkMode.active === 0 ? console.log("zero") : console.log("one");
  let dispatch = useDispatch();

  const goals = useSelector((state) => state.goals.goals);
  const loading = useSelector((state) => state.goals.loading);
  const darkMode = useSelector((state) => state.goals.darkMode);

  useEffect(() => {
    dispatch(getGoals());
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
    <View
      style={[
        styles.screen,
        { backgroundColor: darkMode ? Colors.dark.bg : Colors.light.bg },
      ]}
    >
      <GoalInput isAdding={isAdding} setIsAdding={setIsAdding} />
      {goals.length === 0 && !loading ? <NoGoals /> : <GoalList {...props} />}
    </View>
  );
};

HomeScreen.navigationOptions = (navData) => {
  const isDarkMode = navData.navigation.getParam("isDarkMode");

  return {
    headerTitle: "My Goals",
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
