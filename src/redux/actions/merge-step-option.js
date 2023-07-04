import { MERGE_STEP_OPTION } from "../types/merge-step-option";

export const setMergeStepOption = (data) => ({
  type: MERGE_STEP_OPTION,
  payload: data
});
