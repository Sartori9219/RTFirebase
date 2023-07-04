import { SEL_GIF } from "../types/gif";

const initState = {
  data: null
};

function reducer(state = initState, action) {
  switch (action.type) {
    case SEL_GIF:
      return { data: action.payload };
    default:
      return state;
  }
}

export default reducer;
