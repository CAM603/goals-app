import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import Container from "../components/Container";
import { getSteps } from "../actions/goals";
import StepInput from "../components/StepInput";
import Description from "../components/Description";
import StepList from "../components/StepList";
import CustomText from "../components/CustomText";
import NoSteps from "../components/NoSteps";

const GoalDetailScreen = (props) => {
    const [isAdding, setIsAdding] = useState(false);

    const goal = props.navigation.getParam("goal");
    const steps = useSelector((state) => state.goals.steps);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSteps(goal.id));
    }, []);

    const toggleAdd = () => {
        setIsAdding(!isAdding);
    };

    return (
        <Container style={styles.screen}>
            <View style={styles.container}>
                <Description goal={goal} />
                {steps.length === 0 ? <NoSteps /> : <StepList goal={goal} />}
                <Button title="ADD STEP" onPress={toggleAdd} />
            </View>
            <StepInput
                isAdding={isAdding}
                setIsAdding={setIsAdding}
                goal={goal}
            />
        </Container>
    );
};

GoalDetailScreen.navigationOptions = (navData) => {
    const isDarkMode = navData.navigation.getParam("darkMode");
    const goal = navData.navigation.getParam("goal");

    return {
        headerTitle: goal.goal,
        headerStyle: {
            backgroundColor: Colors.accent,
            shadowColor: "transparent",
        },
        headerTintColor: Colors.dark.text,
        headerTitleStyle: {
            fontFamily: "open-sans-bold",
        },
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="edit"
                    iconName="ios-more"
                    onPress={() => console.log("edit")}
                />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 25,
    },
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
    },
});

export default GoalDetailScreen;
