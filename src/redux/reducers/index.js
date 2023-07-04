import { combineReducers } from "redux";
import user from "./user";
import questions from "./questions";
import currentGrade from "./current-grade";
import currentQuestion from "./current-question";
import currentStep from "./current-step";
import mergeStepOption from "./merge-step-option";
import currentSubject from "./current-subject";
import gif from "./gif";

export default combineReducers({
  user,
  questions,
  currentGrade,
  currentQuestion,
  currentStep,
  mergeStepOption,
  currentSubject,
  gif,
});
