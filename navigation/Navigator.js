import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? "black" : "white",
  },
  headerTitleStyle: {
    color: "black",
  },
  headerBackTitleStyle: {
    color: "black",
  },
  headerTintColor: Platform.OS === "android" ? "white" : "white",
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

export default createAppContainer(GoalsNavigator);
