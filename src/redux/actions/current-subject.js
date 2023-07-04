import { CURRENT_SUBJECT } from "../types/current-subject";

export const setCurrentSubject = (data) => ({
  type: CURRENT_SUBJECT,
  payload: data,
});
