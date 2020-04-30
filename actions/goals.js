import { AsyncStorage } from "react-native";

export const GET_GOALS_START = "GET_GOALS_START";
export const GET_GOALS_SUCCESS = "GET_GOALS_SUCCESS";
export const GET_GOALS_FAILURE = "GET_GOALS_FAILURE";
export const GET_STEPS_START = "GET_STEPS_START";
export const GET_STEPS_SUCCESS = "GET_STEPS_SUCCESS";
export const GET_STEPS_FAILURE = "GET_STEPS_FAILURE";
export const GET_DARK_MODE_START = "GET_DARK_MODE_START";
export const GET_DARK_MODE_SUCCESS = "GET_DARK_MODE_SUCCESS";
export const GET_DARK_MODE_FAILURE = "GET_DARK_MODE_FAILURE";
export const ADD_GOAL = "ADD_GOAL";
export const ADD_STEP = "ADD_STEP";
export const REMOVE_GOAL = "REMOVE_GOAL";
export const TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE";
export const TOGGLE_COMPLETED = "TOGGLE_COMPLETED";

import {
  fetchGoals,
  fetchSteps,
  insertGoal,
  deleteGoal,
  insertStep,
  completeStep,
} from "../helpers/db";

// Gets all goals
export const getGoals = () => (dispatch) => {
  dispatch({ type: GET_GOALS_START });

  fetchGoals()
    .then((res) => {
      dispatch({ type: GET_GOALS_SUCCESS, payload: res.rows._array });
      console.log("GOALS", res.rows._array);
    })
    .catch((err) => {
      dispatch({ type: GET_GOALS_FAILURE, payload: err });
    });
};

// Gets all steps for a goal
export const getSteps = (goal_id) => (dispatch) => {
  dispatch({ type: GET_STEPS_START });

  fetchSteps(goal_id)
    .then((res) => {
      dispatch({ type: GET_STEPS_SUCCESS, payload: res.rows._array });
      console.log("STEPS", res.rows._array);
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: GET_STEPS_FAILURE, payload: err });
    });
};

// Adds a goal and then gets all goals
export const addGoal = (goal) => async (dispatch) => {
  dispatch({ type: ADD_GOAL });
  await insertGoal(goal);
  dispatch(getGoals());
};

// Adds a step and then gets all steps
export const addStep = (step, goal_id) => async (dispatch) => {
  dispatch({ type: ADD_STEP });
  await insertStep(step, goal_id);
  dispatch(getSteps(goal_id));
};

// Removes a goal and then gets all goals
export const removeGoal = (goalID) => async (dispatch) => {
  dispatch({ type: REMOVE_GOAL });
  await deleteGoal(goalID);
  dispatch(getGoals());
};

// Checks for darkmode setting in async storage, sets to false if not there
export const getDarkMode = () => async (dispatch) => {
  dispatch({ type: GET_DARK_MODE_START });

  let res = await AsyncStorage.getItem("DARKMODE");
  res = JSON.parse(res);

  if (res !== null) {
    dispatch({ type: GET_DARK_MODE_SUCCESS, payload: res });
  } else {
    await AsyncStorage.setItem("DARKMODE", JSON.stringify(false));
    dispatch({ type: GET_DARK_MODE_FAILURE, payload: false });
  }
};

// Toggles darkmode boolean
export const toggleDarkMode = () => async (dispatch) => {
  dispatch({ type: TOGGLE_DARK_MODE });
};

// Toggles completed field for step
export const toggleCompleted = (step_id, goal_id) => async (dispatch) => {
  dispatch({ type: TOGGLE_COMPLETED });
  await completeStep(step_id);
};
