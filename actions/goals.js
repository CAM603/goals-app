export const GET_GOALS = "GET_GOALS";
export const ADD_GOAL = "ADD_GOAL";
export const REMOVE_GOAL = "REMOVE_GOAL";

import { fetchGoals, insertGoal, deleteGoal } from "../helpers/db";

export const getGoals = () => async (dispatch) => {
  const res = await fetchGoals();

  console.log("result from actions:", res.rows._array);
  dispatch({ type: GET_GOALS, payload: res.rows._array });
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
