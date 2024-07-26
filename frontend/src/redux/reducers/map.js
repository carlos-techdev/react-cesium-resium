import { OPEN_DRAWER, CLOSE_DRAWER } from "../actions/types";


const initialState ={ drawer: "" };

export function map(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case OPEN_DRAWER:
      return {
        ...state,
        drawer: payload.drawer,
      };

    case CLOSE_DRAWER:
      return {
        ...state,
        drawer:""
      };

    default:
      return state;
  }
}

export default map;
