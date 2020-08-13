import React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import Container from "../components/Container";
import CustomText from "../components/CustomText";
import Colors from "../constants/Colors";

const NoGoals = () => {
    const darkMode = useSelector((state) => state.goals.darkMode);

    return (
        <Container style={styles.container}>
            <CustomText style={styles.title}>0 Goals</CustomText>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    title: {
        fontWeight: "bold",
        fontSize: 30,
    },
});

export default NoGoals;
