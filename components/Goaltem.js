import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const GoalItem = (props) => {
  return (
    <TouchableOpacity onPress={() => props.onDelete(props.id)} activeOpacity={0.7}>
      <View style={styles.listItem}>
        <Text>{props.title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#BADA22',
    borderColor: 'black',
    borderWidth: 1
  }
})

export default GoalItem;