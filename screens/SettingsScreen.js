import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { toggleDarkMode } from "../actions/goals";
import Colors from "../constants/Colors";

const FilterSwitch = (props) => {
    return (
        <View style={styles.filterContainer}>
            <Text
                style={[
                    styles.text,
                    {
                        color: props.isDarkMode
                            ? Colors.dark.text
                            : Colors.light.text,
                    },
                ]}
            >
                {props.label}
            </Text>
            <Switch
                value={props.state}
                onValueChange={props.onChange}
                // trackColor={{ true: "yellow", false: "green" }}
                // thumbColor={Colors.accent}
            />
        </View>
    );
};

const SettingsScreen = (props) => {
    const dispatch = useDispatch();

    const darkMode = useSelector((state) => state.goals.darkMode);

    const toggle = () => {
        dispatch(toggleDarkMode());
    };

    return (
        <View
            style={[
                styles.screen,
                {
                    backgroundColor: darkMode
                        ? Colors.dark.bg
                        : Colors.light.bg,
                },
            ]}
        >
            <FilterSwitch
                label="Dark Mode"
                isDarkMode={darkMode}
                state={darkMode}
                onChange={() => toggle()}
            />
        </View>
    );
};

SettingsScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "Settings",
        headerStyle: {
            backgroundColor: Colors.accent,
            // shadowColor: "transparent",
        },
        headerTintColor: Colors.dark.text,
        headerTitleStyle: {
            fontFamily: "open-sans-bold",
        },
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
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Save"
                    iconName="ios-save"
                    onPress={() => console.log(navData.theme)}
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
    filterContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%",
        marginVertical: 15,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default SettingsScreen;
