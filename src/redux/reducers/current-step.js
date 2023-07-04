import { CURRENT_STEP } from "../types/current-step";

const initState = {
  data: 0
};

const setCurrentStep = (state, action) => {
  return {
    data:
      action.payload.current !== null
        ? action.payload.current
        : state.data < action.payload.max
          ? state.data
          : action.payload.max
  };
};

function reducer(state = initState, action) {
  switch (action.type) {
    case CURRENT_STEP:
      return setCurrentStep(state, action);
    default:
      return state;
  }
}

export default reducer;
