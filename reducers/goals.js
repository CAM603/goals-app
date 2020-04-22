import {
  GET_GOALS_START,
  GET_GOALS_SUCCESS,
  GET_GOALS_FAILURE,
  GET_DARK_MODE_START,
  GET_DARK_MODE_SUCCESS,
  GET_DARK_MODE_FAILURE,
  ADD_GOAL,
  REMOVE_GOAL,
  TOGGLE_DARK_MODE,
} from "../actions/goals";

import { AsyncStorage } from "react-native";

const getDarkMode = async () => {
  let res = await AsyncStorage.getItem("DARKMODE");
  res = JSON.parse(res);
  return res;
};

const initialState = {
  goals: [],
  loading: false,
  loadingDarkMode: false,
  darkMode: getDarkMode(),
  error: "",
};

const goalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GOALS_START:
      return { ...state, loading: true };
    case GET_GOALS_SUCCESS:
      return { ...state, goals: action.payload, loading: false };
    case GET_GOALS_FAILURE:
      return { ...state, errors: action.payload, loading: false };
    case ADD_GOAL:
      return { ...state, loading: true };
    case REMOVE_GOAL:
      return { ...state, loading: true };
    case GET_DARK_MODE_START:
      return { ...state, loadingDarkMode: true };
    case GET_DARK_MODE_SUCCESS:
      return { ...state, darkMode: action.payload, loadingDarkMode: false };
    case GET_DARK_MODE_FAILURE:
      return { ...state, darkMode: action.payload, loadingDarkMode: false };
    case TOGGLE_DARK_MODE:
      AsyncStorage.setItem("DARKMODE", JSON.stringify(!state.darkMode));
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
};

export default goalsReducer;
