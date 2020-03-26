import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

import GoalItem from './components/Goaltem';
import GoalInput from './components/GoalInput';
import { init, insertGoal, fetchGoals, deleteGoals } from './helpers/db';

init()
  .then(() => {
    console.log('Initailized database')
  })
  .catch((err) => {
    console.log('Initializing database failed')
    console.log(err)
  })

export default function App() {
  const [goals, setGoals] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    getDb()
  }, [])

  const addDb = async (goal) => {
    const dbRes = await insertGoal(goal)
    // console.log(dbRes)
  }

  const getDb = async () => {
    const res = await fetchGoals()
    console.log('result:', res.rows._array)
    setGoals(res.rows._array)
  }

  const deleteDb = async () => {
    const res = await deleteGoals()
    console.log(res)
  }

  const addGoalHandler = (goal) => {
    // setGoals([...goals, enteredGoal])
    setGoals(currentGoals => [
      ...currentGoals, {id: Math.random().toString(), text: goal}
    ]);
    setIsAdding(false);
    addDb(goal)
    getDb()
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
        keyExtractor={(item, index) => item.id.toString()}
        data={goals}
        renderItem={itemData => (
          <GoalItem 
            onDelete={onDelete} 
            title={itemData.item.goal}
            id={itemData.item.id}
          />
        )}
      />
      <Button title="DELETE DB" onPress={deleteGoals}/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
