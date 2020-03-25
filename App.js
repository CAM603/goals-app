import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [goals, setGoals] = useState([])

  const goalInputHandler = (text) => {
    setEnteredGoal(text)
  }

  const addGoalHandler = () => {
    // setGoals([...goals, enteredGoal])
    setGoals(currentGoals => [
      ...currentGoals, {id: Math.random().toString(), text: enteredGoal}
    ]);
  }

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Goal" 
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <Button 
          title="ADD"
          onPress={addGoalHandler}
        />
      </View>
      <FlatList
      keyExtractor={(item, index) => item.id}
        data={goals}
        renderItem={item => (
          <View style={styles.listItem}>
            <Text>{item.item.text}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  input: {
    borderBottomColor: 'black', 
    borderBottomWidth: 1, 
    padding: 10, 
    width: '80%'
  },
  inputContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#BADA22',
    borderColor: 'black',
    borderWidth: 1
  }
});
