import {
  LOAD_QUESTIONS,
  GET_QUESTION,
  BUY_HINT,
  SELECTED_QUESTION,
  GET_CURRENT_QUESTION
} from "../types/questions";

export const loadQuestions = (data) => ({
  type: LOAD_QUESTIONS,
  payload: data
});

export const getQuestion = (data) => ({
  type: GET_QUESTION,
  payload: data
});

export const getCurrentQuestion = (data) => ({
  type: GET_CURRENT_QUESTION,
  payload: data
});
export const buyHint = (data) => ({
  type: BUY_HINT,
  payload: data
});

export const selectedQuestion = (data) => ({
  type: SELECTED_QUESTION,
  payload: data
});
