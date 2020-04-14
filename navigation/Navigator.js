import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen";

const GoalsNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
});

export default createAppContainer(GoalsNavigator);
