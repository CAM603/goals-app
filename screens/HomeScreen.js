import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import { getGoals, addGoal, removeGoal } from "../actions/goals";
import GoalInput from "../components/GoalInput";
import HeaderButton from "../components/HeaderButton";
import GoalList from "../components/GoalList";
import NoGoals from "../components/NoGoals";

const HomeScreen = (props) => {
  const [isAdding, setIsAdding] = useState(false);

  // let darkMode = settings.find((el) => el.setting === "Dark Mode");
  // darkMode.active === 0 ? console.log("zero") : console.log("one");
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGoals());
  }, [goals]);

  const goals = useSelector((state) => state.goals.goals);

  useEffect(() => {
    props.navigation.setParams({ toggleAdding: toggleAdd });
  }, [goals]);

  const deleteHandler = (goalID) => {
    dispatch(removeGoal(goalID));
  };

  const addGoalHandler = (goal) => {
    setIsAdding(false);
    dispatch(addGoal(goal));
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
