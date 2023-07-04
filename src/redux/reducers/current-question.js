import { CURRENT_QUESTION } from "../types/current-question";

const initState = {
  data: 0
};

const setCurrentQuestion = (state, action) => {
  return {
    data:
      action.payload.current != null
        ? action.payload.current <= action.payload.max
          ? action.payload.current
          : action.payload.max
        : state.data < action.payload.max
        ? state.data
        : action.payload.max
  };
};

function reducer(state = initState, action) {
  switch (action.type) {
    case CURRENT_QUESTION:
      return setCurrentQuestion(state, action);
    default:
      return state;
  }
}

export default reducer;
