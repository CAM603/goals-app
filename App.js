import React from "react";
import { init, init2, insertSetting, fetchSettings } from "./helpers/db";
import GoalsNavigator from "./navigation/Navigator";

init()
  .then(() => {
    console.log("Initailized goals database");
  })
  .catch((err) => {
    console.log("Initializing database failed");
    console.log(err);
  });

init2()
  .then(async () => {
    console.log("Initailized settings database");
    const res = await fetchSettings();
    if (res.rows._array.some((el) => el.setting === "Dark Mode")) {
      return;
    } else {
      insertSetting("Dark Mode");
    }
  })
  .catch((err) => {
    console.log("Initializing database failed");
    console.log(err);
  });

export default function App() {
  return <GoalsNavigator />;
}
