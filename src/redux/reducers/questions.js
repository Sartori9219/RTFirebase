import {
  GET_QUESTION,
  BUY_HINT,
  SELECTED_QUESTION,
  GET_CURRENT_QUESTION,
  LOAD_QUESTIONS,
} from "../types/questions";

const initState = { data: null, current: 0 };

function reducer(state = initState, action) {
  switch (action.type) {
    case GET_QUESTION:
      return { ...state, data: action.payload };
    case BUY_HINT:
      return { ...state, data: action.payload };
    case SELECTED_QUESTION:
      return {
        ...state,
        current:
          action.payload < state.data.length - 1
            ? state.current + 1
            : state.data.length - 1,
      };
    case GET_CURRENT_QUESTION:
      return {
        ...state,
        data:
          action.payload < state.data.length
            ? state.data[action.payload]
            : state.data[state.data.length - 1],
      };
    case LOAD_QUESTIONS:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

export default reducer;



// import {
//   GET_QUESTION,
//   BUY_HINT,
//   SELECTED_QUESTION,
//   GET_CURRENT_QUESTION,
//   LOAD_QUESTIONS,
// } from "../types/questions";

// const initState = () => {
//   return { data: null };
// };

// function reducer(state = initState(), action) {
//   switch (action.type) {
//     case GET_QUESTION:
//       return { data: state.action.payload };
//     case BUY_HINT:
//       return { data: state.action.payload };
//     case SELECTED_QUESTION:
//       return {
//         current:
//           action.payload < state.data.length - 1
//             ? state.current + 1
//             : state.data.length - 1,
//       };
//     case GET_CURRENT_QUESTION:
//       return {
//         data:
//           action.payload < state.data.length
//             ? state.data[action.payload]
//             : state.data[state.data.length - 1],
//       };
//     case LOAD_QUESTIONS:
//       return { data: action.payload };
//     default:
//       return state;
//   }
// }

// export default reducer;
