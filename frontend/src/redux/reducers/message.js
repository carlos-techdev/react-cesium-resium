import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";

const initialState = {
  messages: [],
  type: "",
};

export function message(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { messages: payload.messages, type: payload.type };

    case CLEAR_MESSAGE:
      return { messages: [], type: "" };

    default:
      return state;
  }
}
export default message;
