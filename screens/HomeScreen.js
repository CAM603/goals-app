import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import GoalInput from "../components/GoalInput";
import {
  insertGoal,
  insertSetting,
  fetchGoals,
  fetchSettings,
  deleteGoals,
  deleteGoal,
} from "../helpers/db";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import GoalList from "../components/GoalList";
import NoGoals from "../components/NoGoals";

const HomeScreen = (props) => {
  const [goals, setGoals] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    getDb();
  }, []);

  useEffect(() => {
    props.navigation.setParams({ toggleAdding: toggleAdd });
  }, []);

  const getDb = async () => {
    const res = await fetchGoals();
    console.log("result:", res.rows._array);
    setGoals(res.rows._array);
    const res2 = await fetchSettings();
    console.log(res2.rows._array);
  };

  const deleteHandler = (itemId) => {
    deleteGoal(itemId);
    getDb();
  };

  const addGoalHandler = (goal) => {
    setIsAdding(false);
    insertGoal(goal);
    insertSetting(goal);
    getDb();
  };

  const cancelAdd = () => {
    setIsAdding(false);
  };

  const toggleAdd = () => {
    setIsAdding(!isAdding);
  };

  return (
    <View style={styles.screen}>
      <GoalInput
        addGoalHandler={addGoalHandler}
        visible={isAdding}
        cancelAdd={cancelAdd}
      />
      {goals.length === 0 ? (
        <NoGoals />
      ) : (
        <GoalList goals={goals} deleteHandler={deleteHandler} />
      )}
      {/* <Button title="DELETE ALL" onPress={deleteGoals} /> */}
    </View>
  );
};

HomeScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "My Goals",
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
    backgroundColor: "#fff",
  },
});

export default HomeScreen;
