import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addStep } from "../actions/goals";
import CustomModal from "../components/CustomModal";

const StepInput = (props) => {
  const [enteredStep, setEnteredStep] = useState("");
  const dispatch = useDispatch();

  const stepInputHandler = (text) => {
    setEnteredStep(text);
  };

  const addStepHandler = () => {
    if (!enteredStep) {
      return;
    }
    props.setIsAdding(false);
    dispatch(addStep(enteredStep, props.goal.id));
    setEnteredStep("");
  };

  const cancelHandler = () => {
    props.setIsAdding(false);
    setEnteredStep("");
  };

  return (
    <CustomModal
      isVisible={props.isAdding}
      inputHandler={stepInputHandler}
      value={enteredStep}
      cancelHandler={cancelHandler}
      submitHandler={addStepHandler}
      title="Add a step!"
    />
  );
};

export default StepInput;
