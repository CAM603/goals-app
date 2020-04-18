import React from "react";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

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

export default function App() {
  return (
    <Provider store={store}>
      <GoalsNavigator />
    </Provider>
  );
}
