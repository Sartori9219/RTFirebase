import { KEY_DATA_USER, SET_USER, GET_USER, LOAD_USER } from "../types/user";
import { storeData, getData } from "../util/data";

const setUser = (state, action) => {
  storeData(KEY_DATA_USER, action.payload);
  return { data: action.payload };
};

const getUser = (key) => {
  const res = getData(key);
  return { data: res };
};

const initState = {
  data: {},
};

function reducer(state = initState, action) {
  switch (action.type) {
    case SET_USER:
      return setUser(state, action);
    case GET_USER:
      return getUser();
    case LOAD_USER:
      return { data: action.payload };
    default:
      return state;
  }
}

export default reducer;
