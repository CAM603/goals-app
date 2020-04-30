import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

const Description = ({ description }) => {
  const [editing, setEditing] = useState(false);
  return (
    <View>
      {editing ? (
        <View>
          <TextInput placeholder="edit description" />
        </View>
      ) : (
        <TouchableOpacity onPress={() => setEditing(true)}>
          <Text>{description}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Description;
