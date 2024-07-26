import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import map from "./map";

export default combineReducers({
  auth,
  message,
  map,
});
