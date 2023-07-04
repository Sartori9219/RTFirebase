import { CURRENT_QUESTION } from "../types/current-question";

export const setCurrentQuestion = (data) => ({
  type: CURRENT_QUESTION,
  payload: data,
});
