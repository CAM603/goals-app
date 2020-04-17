import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import GoalItem from "../components/Goaltem";
import Loading from "../components/Loading";

const GoalList = (props) => {
  const loading = useSelector((state) => state.goals.loading);
  const goals = useSelector((state) => state.goals.goals);

  return (
    <View style={styles.listContainer}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          keyExtractor={(item, index) => item.id.toString()}
          data={goals}
          renderItem={(itemData) => (
            <GoalItem title={itemData.item.goal} id={itemData.item.id} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: "90%",
    justifyContent: "center",
  },
});

export default GoalList;
