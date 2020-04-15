import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import GoalItem from "../components/Goaltem";

const GoalList = ({ goals, deleteHandler }) => {
  return (
    <View style={styles.listContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: "90%",
    // alignItems: "center",
    justifyContent: "center",
  },
});

export default GoalList;
