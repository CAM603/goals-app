export const GET_GOALS = "GET_GOALS";
export const ADD_GOAL = "ADD_GOAL";
export const REMOVE_GOAL = "REMOVE_GOAL";
export const TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE";
export const GET_SETTINGS = "GET_SETTINGS";
export const INITIALIZE_SETTINGS = "INITIALIZE_SETTINGS";

import {
  fetchGoals,
  insertGoal,
  deleteGoal,
  fetchSettings,
} from "../helpers/db";

export const getGoals = () => async (dispatch) => {
  const res = await fetchGoals();

  // console.log("result from actions:", res.rows._array);
  dispatch({ type: GET_GOALS, payload: res.rows._array });
};

export const getSettings = () => async (dispatch) => {
  const res = await fetchSettings();

  // console.log("settings:", res.rows._array);
  dispatch({ type: GET_SETTINGS, payload: res.rows._array });
};

export const addGoal = (goal) => async (dispatch) => {
  dispatch({ type: ADD_GOAL });
  await insertGoal(goal);
  dispatch(getGoals());
};

export const removeGoal = (goalID) => async (dispatch) => {
  dispatch({ type: REMOVE_GOAL });
  await deleteGoal(goalID);
  dispatch(getGoals());
};

export const toggleDarkMode = () => async (dispatch) => {
  dispatch({ type: TOGGLE_DARK_MODE });
};
