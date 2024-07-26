import { SET_MESSAGE, CLEAR_MESSAGE } from "./types";

export const setMessage = (payload) => ({
  type: SET_MESSAGE,
  payload: payload,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});
