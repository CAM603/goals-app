import { AsyncStorage } from "react-native";

export const GET_GOALS_START = "GET_GOALS_START";
export const GET_GOALS_SUCCESS = "GET_GOALS_SUCCESS";
export const GET_GOALS_FAILURE = "GET_GOALS_FAILURE";
export const GET_DARK_MODE_START = "GET_DARK_MODE_START";
export const GET_DARK_MODE_SUCCESS = "GET_DARK_MODE_SUCCESS";
export const GET_DARK_MODE_FAILURE = "GET_DARK_MODE_FAILURE";
export const ADD_GOAL = "ADD_GOAL";
export const REMOVE_GOAL = "REMOVE_GOAL";
export const TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE";

import { fetchGoals, insertGoal, deleteGoal } from "../helpers/db";

export const getGoals = () => (dispatch) => {
  dispatch({ type: GET_GOALS_START });

  fetchGoals()
    .then((res) => {
      dispatch({ type: GET_GOALS_SUCCESS, payload: res.rows._array });
    })
    .catch((err) => {
      dispatch({ type: GET_GOALS_FAILURE, payload: err });
    });
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

export const toggleDarkMode = () => async (dispatch) => {
  dispatch({ type: TOGGLE_DARK_MODE });
};
