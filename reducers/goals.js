import {
  GET_GOALS_START,
  GET_GOALS_SUCCESS,
  GET_GOALS_FAILURE,
  ADD_GOAL,
  REMOVE_GOAL,
  TOGGLE_DARK_MODE,
} from "../actions/goals";

const initialState = {
  goals: [],
  loading: false,
  darkMode: false,
  error: "",
};

const goalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GOALS_START:
      return { ...state, loading: true };
    case GET_GOALS_SUCCESS:
      return { ...state, goals: action.payload, loading: false };
    case GET_GOALS_FAILURE:
      return { ...state, errors: action.payload };
    case ADD_GOAL:
      return { ...state, loading: true };
    case REMOVE_GOAL:
      return { ...state, loading: true };
    case TOGGLE_DARK_MODE:
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
};

export default goalsReducer;
