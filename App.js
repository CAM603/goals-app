import React, { useState } from "react";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import { init, init2, insertSetting, fetchSettings } from "./helpers/db";
import GoalsNavigator from "./navigation/Navigator";
import goalsReducer from "./reducers/goals";

enableScreens();

init()
  .then(() => {
    console.log("Initailized goals database");
  })
  .catch((err) => {
    console.log("Initializing database failed");
    console.log(err);
  });

// init2()
//   .then(async () => {
//     console.log("Initailized settings database");
//     const res = await fetchSettings();
//     if (res.rows._array.some((el) => el.setting === "Dark Mode")) {
//       return;
//     } else {
//       insertSetting("Dark Mode");
//     }
//   })
//   .catch((err) => {
//     console.log("Initializing database failed");
//     console.log(err);
//   });

const rootReducer = combineReducers({
  goals: goalsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }
  return (
    <Provider store={store}>
      <GoalsNavigator />
    </Provider>
  );
}
