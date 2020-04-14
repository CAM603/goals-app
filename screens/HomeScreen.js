import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import GoalItem from "../components/Goaltem";
import GoalInput from "../components/GoalInput";
import { insertGoal, fetchGoals, deleteGoals, deleteGoal } from "../helpers/db";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const HomeScreen = (props) => {
  const [goals, setGoals] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

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
  };

  const deleteHandler = (itemId) => {
    deleteGoal(itemId);
    getDb();
  };

  const addGoalHandler = (goal) => {
    setIsAdding(false);
    insertGoal(goal);
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
      <FlatList
        keyExtractor={(item, index) => item.id.toString()}
        data={goals}
        renderItem={(itemData) => (
          <GoalItem
            title={itemData.item.goal}
            id={itemData.item.id}
            deleteHandler={deleteHandler}
          />
        )}
      />
      <Button title="DELETE ALL" onPress={deleteGoals} />
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
  };
};
const styles = StyleSheet.create({});

export default HomeScreen;
