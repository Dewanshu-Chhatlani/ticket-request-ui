import axios from "axios";
import * as types from "../types";

export const signInRequest = () => ({
  type: types.SIGN_IN_REQUEST,
});

export const signInSuccess = (userData) => ({
  type: types.SIGN_IN_SUCCESS,
  payload: userData,
});

export const signInFailure = (error) => ({
  type: types.SIGN_IN_FAILURE,
  payload: error,
});

export const clearUserData = () => ({
  type: types.CLEAR_USER_DATA,
});

export const signInUser = (userData) => {
  return (dispatch) => {
    dispatch(signInRequest());

    axios
      .post("http://localhost:5000/login", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispatch(signInSuccess(response.data)); // Dispatch success action with received data
      })
      .catch((error) => {
        dispatch(signInFailure(error.response.data.error)); // Dispatch failure action with error message
      });
  };
};
