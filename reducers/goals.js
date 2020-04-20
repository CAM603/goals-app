import {
  GET_GOALS,
  ADD_GOAL,
  REMOVE_GOAL,
  TOGGLE_DARK_MODE,
  GET_SETTINGS,
} from "../actions/goals";

const initialState = {
  goals: [],
  settings: [],
  loading: false,
  darkMode: false,
};

const goalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GOALS:
      return { ...state, goals: action.payload, loading: false };
    case ADD_GOAL:
      return { ...state, loading: true };
    case REMOVE_GOAL:
      return { ...state, loading: true };
    case TOGGLE_DARK_MODE:
      return { ...state, darkMode: !state.darkMode };
    case GET_SETTINGS:
      return { ...state, settings: action.payload };
    default:
      return state;
  }
};

export default goalsReducer;
