import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import GoalDetailScreen from "../screens/GoalDetailScreen";

import Colors from "../constants/Colors";

const defaultStackNavOptions = {
  // headerStyle: {
  //   backgroundColor: Platform.OS === "android" ? "black" : "white",
  // },
  // headerTitleStyle: {
  //   fontFamily: "open-sans",
  // },
  // headerBackTitleStyle: {
  //   color: "black",
  // },
  // headerTintColor: Platform.OS === "android" ? "black" : "white",
  headerTitle: "A Screen",
};

const GoalsNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Goal: { screen: GoalDetailScreen },
  },
  {
    // mode: "modal",

    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const SettingsNavigator = createStackNavigator(
  {
    Settings: { screen: SettingsScreen },
  },
  {
    // Used with shifting on android
    // tabBarColor: "black",
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const RouteConfigs = {
  Goals: {
    screen: GoalsNavigator,
  },
  Settings: {
    screen: SettingsNavigator,
  },
};

const DrawerNavigatorConfig = {
  contentOptions: {
    // add your styling here
    activeTintColor: "#e91e63",
    inactiveTintColor: "white",
    itemsContainerStyle: {
      marginVertical: 0,
    },
    iconContainerStyle: {
      opacity: 1,
    },
  },
  drawerBackgroundColor: Colors.accent, // sets background color of drawer
};

const MainNavigator = createDrawerNavigator(
  RouteConfigs,
  DrawerNavigatorConfig
);

export default createAppContainer(MainNavigator);
