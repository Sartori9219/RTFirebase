import { CURRENT_SUBJECT } from "../types/current-subject";

const initState = {
  data: 0,
};

const setCurrentSubject = (state, action) => {
  return {
    data: action.payload.subject,
  };
};

function reducer(state = initState, action) {
  switch (action.type) {
    case CURRENT_SUBJECT:
      return setCurrentSubject(state, action);
    default:
      return state;
  }
}

export default reducer;
