import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addGoal } from "../actions/goals";
import CustomModal from "../components/CustomModal";

const GoalInput = (props) => {
  const [enteredGoal, setEnteredGoal] = useState("");
  const dispatch = useDispatch();

  const goalInputHandler = (text) => {
    setEnteredGoal(text);
  };

  const addGoalHandler = () => {
    if (!enteredGoal) {
      return;
    }
    props.setIsAdding(false);
    dispatch(addGoal(enteredGoal));
    setEnteredGoal("");
  };

  const cancelHandler = () => {
    props.setIsAdding(false);
    setEnteredGoal("");
  };

  return (
    <CustomModal
      isVisible={props.isAdding}
      inputHandler={goalInputHandler}
      value={enteredGoal}
      cancelHandler={cancelHandler}
      submitHandler={addGoalHandler}
    />
  );
};

export default GoalInput;
