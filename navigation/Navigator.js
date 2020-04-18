import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";

const defaultStackNavOptions = {
  // headerStyle: {
  //   backgroundColor: Platform.OS === "android" ? "black" : "white",
  // },
  // headerTitleStyle: {
  //   color: "black",
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
  },
  {
    mode: "modal",

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

const MainNavigator = createDrawerNavigator({
  Goals: {
    screen: GoalsNavigator,
  },
  Settings: {
    screen: SettingsNavigator,
  },
});

export default createAppContainer(MainNavigator);
