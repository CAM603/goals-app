import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Button, Modal} from 'react-native';

const GoalInput = (props) => {
  const [enteredGoal, setEnteredGoal] = useState('');

  const goalInputHandler = (text) => {
    setEnteredGoal(text)
  }
  const addGoal = () => {
    if(!enteredGoal) {
      return
    }
    props.addGoalHandler(enteredGoal)
    setEnteredGoal('')
  }
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput 
              placeholder="Goal" 
              style={styles.input}
              onChangeText={goalInputHandler}
              value={enteredGoal}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="CANCEL" color="red" onPress={props.cancelAdd}/>
          </View>
          <View style={styles.button}>
            <Button 
              title="ADD"
              onPress={addGoal}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  input: {
    borderBottomColor: 'black', 
    borderBottomWidth: 1, 
    padding: 10, 
    width: '80%',
    marginBottom: 10
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between'
  },
  button: {
    width: 100
  }
})

export default GoalInput;