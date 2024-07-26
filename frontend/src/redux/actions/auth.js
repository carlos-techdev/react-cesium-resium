import { LOGIN_SUCCESS, LOGOUT, SET_MESSAGE } from "./types";

import AuthService from "../../services/auth.service";

import { statusParser } from "../../util/statusParser";
import {
  validateLoginFields,
  validateRegistrationFields,
} from "../../util/validator";

export const login = (payload) => async (dispatch) => {
  try {
    const errors = validateLoginFields(payload.email, payload.password);
    if (errors.length > 0) {
      const errorThrow = {
        status: 400,
        data: {
          errors,
        },
      };
      throw errorThrow;
    } else {
      const result = await AuthService.login(payload);
      const { token, user } = result.data;
      if (token && user && result.status === 200) {
        localStorage.setItem("token", token);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user },
        });
        dispatch({
          type: SET_MESSAGE,
          payload: {
            messages: [],
            type: "",
          },
        });
      } else {
        dispatch({
          type: SET_MESSAGE,
          payload: {
            messages: [{ msg: "Unknown error" }],
            type: "error",
          },
        });
      }
    }
  } catch (err) {
    const type = statusParser(err.status);

    dispatch({
      type: SET_MESSAGE,
      payload: {
        messages: err.data.errors,
        type: type,
      },
    });
  }
};

export const register = (payload) => async (dispatch) => {
  try {
    const errors = validateRegistrationFields(
      payload.email,
      payload.firstName,
      payload.lastName,
      payload.password
    );
    if (errors.length > 0) {
      const errorThrow = {
        status: 400,
        data: {
          errors,
        },
      };
      throw errorThrow;
    } else {
      const result = await AuthService.register(payload);

      if (result.status === 201) {
        const { token, user } = result.data;
        if (token && user) {
          localStorage.setItem("token", token);
          dispatch({
            type: LOGIN_SUCCESS,
            payload: { user },
          });
          dispatch({
            type: SET_MESSAGE,
            payload: {
              messages: [],
              type: "",
            },
          });
        } else {
          dispatch({
            type: SET_MESSAGE,
            payload: {
              messages: [{ msg: "Unknown error" }],
              type: "error",
            },
          });
        }
      } else {
        dispatch({
          type: SET_MESSAGE,
          payload: {
            messages: [{ msg: "Unknown error" }],
            type: "error",
          },
        });
      }
    }
  } catch (err) {
    const type = statusParser(err.status);

    dispatch({
      type: SET_MESSAGE,
      payload: {
        messages: err.data.errors,
        type: type,
      },
    });
  }
};

export const logout = () => (dispatch) => {
  AuthService.logout();
  localStorage.clear();
  dispatch({
    type: LOGOUT,
  });
};
