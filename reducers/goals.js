import { GET_GOALS, ADD_GOAL, REMOVE_GOAL } from "../actions/goals";

const initialState = {
  goals: [],
  settings: [],
  loading: false,
};

const goalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GOALS:
      return { ...state, goals: action.payload, loading: false };
    case ADD_GOAL:
      return { ...state, loading: true };
    case REMOVE_GOAL:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default goalsReducer;
