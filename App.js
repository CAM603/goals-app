import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

import GoalItem from './components/Goaltem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [goals, setGoals] = useState([]);
  const [isAdding, setIsAdding] = useState(false)

  const addGoalHandler = (goal) => {
    // setGoals([...goals, enteredGoal])
    setGoals(currentGoals => [
      ...currentGoals, {id: Math.random().toString(), text: goal}
    ]);
    setIsAdding(false);
  }

  const onDelete = (goalId) => {
    setGoals(currentGoals => {
      return currentGoals.filter(goal => goal.id !== goalId)
    })
  }

  const cancelAdd = () => {
    setIsAdding(false)
  }

  return (
    <View style={styles.screen}>
      <Button title="Add a Goal" onPress={() => setIsAdding(true)}/>
      <GoalInput
        addGoalHandler={addGoalHandler}
        visible={isAdding}
        cancelAdd={cancelAdd}
      />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={goals}
        renderItem={itemData => (
          <GoalItem 
            onDelete={onDelete} 
            title={itemData.item.text}
            id={itemData.item.id}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
