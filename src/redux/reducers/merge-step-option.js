import { MERGE_STEP_OPTION } from "../types/merge-step-option";

const initState = {
  data: {}
};

function reducer(state = initState, action) {
  switch (action.type) {
    case MERGE_STEP_OPTION:
      return { data: action.payload };
    default:
      return state;
  }
}

export default reducer;
