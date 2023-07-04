import { CURRENT_GRADE } from "../types/current-grade";

export const setCurrentGrade = (data) => ({
  type: CURRENT_GRADE,
  payload: data,
});
