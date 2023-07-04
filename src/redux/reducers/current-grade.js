import { CURRENT_GRADE } from "../types/current-grade";

const initState = {
  data: 0,
};

const setCurrentGrade = (state, action) => {
  return {
    data:
      action.payload.current != null
        ? action.payload.current <= action.payload.max
          ? action.payload.current
          : action.payload.max
        : state.data < action.payload.max
        ? state.data
        : action.payload.max,
  };
};

function reducer(state = initState, action) {
  switch (action.type) {
    case CURRENT_GRADE:
      return setCurrentGrade(state, action);
    default:
      return state;
  }
}

export default reducer;
