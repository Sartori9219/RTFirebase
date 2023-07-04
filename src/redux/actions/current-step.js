import { CURRENT_STEP } from "../types/current-step";

export const setCurrentStep = (data) => ({
  type: CURRENT_STEP,
  payload: data
});
