import React from "react";
import { Text, View, StyleSheet } from "react-native";
import CustomText from "../components/CustomText";

const NoSteps = () => {
    return (
        <View style={styles.container}>
            <CustomText style={styles.text}>Lets get Started!</CustomText>
            <Text style={styles.emoji}>👇</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    text: {
        fontSize: 35,
    },
    emoji: {
        fontSize: 50,
    },
});

export default NoSteps;
