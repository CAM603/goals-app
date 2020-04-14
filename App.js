import React, { useState, useEffect } from "react";
import { init } from "./helpers/db";
import GoalsNavigator from "./navigation/Navigator";

init()
  .then(() => {
    console.log("Initailized database");
  })
  .catch((err) => {
    console.log("Initializing database failed");
    console.log(err);
  });

export default function App() {
  return <GoalsNavigator />;
}
