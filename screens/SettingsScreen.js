import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import HeaderButton from "../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        value={props.state}
        onValueChange={props.onChange}
        trackColor={{ true: "black" }}
        thumbColor={Platform.OS === "android" ? "black" : "white"}
      />
    </View>
  );
};

const SettingsScreen = (props) => {
  const [darkMode, setDarkMode] = useState(false);

  const saveSettings = useCallback(() => {
    const appliedSettings = {
      hasDarkMode: darkMode,
    };
    console.log(appliedSettings);
  }, [darkMode]);

  useEffect(() => {
    getDb();
    props.navigation.setParams({ save: saveSettings });
  }, [saveSettings]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Settings</Text>
      <FilterSwitch
        label="Dark Mode"
        state={darkMode}
        onChange={(newValue) => setDarkMode(newValue)}
      />
    </View>
  );
};

SettingsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Settings",
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
  title: {
    fontSize: 22,
    margin: 20,
    textAlign: "center",
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
