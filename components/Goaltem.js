import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { removeGoal } from "../actions/goals";
import Colors from "../constants/Colors";
import Container from "./Container";
import CustomText from "../components/CustomText";

const GoalItem = (props) => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.goals.darkMode);

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
                props.navigation.navigate("Goal", {
                    goal: props.goal,
                    darkMode: darkMode,
                })
            }
        >
            <Container style={styles.listItem}>
                <CustomText style={styles.title}>{props.title}</CustomText>
                <CustomText onPress={() => dispatch(removeGoal(props.id))}>
                    ❌
                </CustomText>
            </Container>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    listItem: {
        padding: 5,
        marginVertical: 10,
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: Colors.accent,
    },
    title: {
        fontSize: 22,
        fontFamily: "open-sans-bold",
    },
});

export default GoalItem;
