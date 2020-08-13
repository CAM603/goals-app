import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import { getGoals, getDarkMode, getSteps } from "../actions/goals";
import GoalInput from "../components/GoalInput";
import HeaderButton from "../components/HeaderButton";
import GoalList from "../components/GoalList";
import NoGoals from "../components/NoGoals";
import Container from "../components/Container";
import Colors from "../constants/Colors";
import Loading from "../components/Loading";

const HomeScreen = (props) => {
    const [isAdding, setIsAdding] = useState(false);

    let dispatch = useDispatch();

    const goals = useSelector((state) => state.goals.goals);
    const loading = useSelector((state) => state.goals.loading);
    const loadingDarkMode = useSelector((state) => state.goals.loadingDarkMode);

    useEffect(() => {
        dispatch(getGoals());
        dispatch(getDarkMode());
    }, []);

    useEffect(() => {
        props.navigation.setParams({ toggleAdding: toggleAdd });
    }, [toggleAdd]);

    const toggleAdd = () => {
        setIsAdding(!isAdding);
    };

    const renderHome = () => {
        return (
            <>
                <GoalInput isAdding={isAdding} setIsAdding={setIsAdding} />
                {goals.length === 0 ? <NoGoals /> : <GoalList {...props} />}
            </>
        );
    };

    return (
        <Container style={styles.screen}>
            {loading || loadingDarkMode ? <Loading /> : renderHome()}
        </Container>
    );
};

HomeScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "My Goals",
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
                    title="add"
                    iconName="md-add-circle"
                    onPress={navData.navigation.getParam("toggleAdding")}
                />
            </HeaderButtons>
        ),
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="menu"
                    iconName="ios-menu"
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
    },
});

export default HomeScreen;
