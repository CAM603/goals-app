import React, { useEffect, useCallback } from "react";
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
        style={{
          color: props.isDarkMode ? Colors.dark.text : Colors.light.text,
        }}
      >
        {props.label}
      </Text>
      <Switch
        value={props.state}
        onValueChange={props.onChange}
        trackColor={{ true: Colors.dark.text, false: Colors.dark.bg }}
        thumbColor={props.isDarkMode ? Colors.dark.text : Colors.light.text}
      />
    </View>
  );
};

const SettingsScreen = (props) => {
  const dispatch = useDispatch();

  const darkMode = useSelector((state) => state.goals.darkMode);
  const isDarkMode = props.navigation.getParam("isDarkMode");

  const saveSettings = useCallback(() => {
    const appliedSettings = {
      hasDarkMode: darkMode,
    };
    console.log(appliedSettings);
  }, [darkMode]);

  const toggle = () => {
    dispatch(toggleDarkMode());
  };

  useEffect(() => {
    props.navigation.setParams({ save: saveSettings });
  }, [saveSettings]);

  useEffect(() => {
    props.navigation.setParams({ isDarkMode: darkMode });
  }, [darkMode]);

  return (
    <View
      style={[
        styles.screen,
        { backgroundColor: isDarkMode ? Colors.dark.bg : Colors.light.bg },
      ]}
    >
      <FilterSwitch
        label="Dark Mode"
        isDarkMode={isDarkMode}
        state={darkMode}
        onChange={() => toggle()}
      />
    </View>
  );
};

SettingsScreen.navigationOptions = (navData) => {
  const isDarkMode = navData.navigation.getParam("isDarkMode");

  return {
    headerTitle: "Settings",
    headerStyle: {
      backgroundColor: isDarkMode ? Colors.dark.bg : Colors.light.bg,
    },
    headerTintColor: isDarkMode ? Colors.dark.text : Colors.light.text,
    headerTitleStyle: {
      // fontWeight: "bold",
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
          onPress={navData.navigation.getParam("save")}
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
});

export default SettingsScreen;
