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
    <View style={styles.container}>
      {editing ? (
        <View style={styles.description}>
          <TextInput
            style={{ fontSize: 16, padding: 5 }}
            placeholder="edit description"
          />
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => setEditing(true)}
          style={styles.description}
        >
          <Text style={styles.descriptionText}>
            {description ? description : "Describe your goal"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  description: {
    width: "90%",
    borderWidth: 3,
    borderColor: "black",
    height: 100,
  },
  descriptionText: {
    fontSize: 16,
    padding: 5,
  },
});

export default Description;
