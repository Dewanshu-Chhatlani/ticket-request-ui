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

const signUpRequest = () => ({
  type: types.SIGN_UP_REQUEST,
});

const signUpSuccess = (userData) => ({
  type: types.SIGN_UP_SUCCESS,
  payload: userData,
});

const signUpFailure = (error) => ({
  type: types.SIGN_UP_FAILURE,
  payload: error,
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

export const signUpUser = (userData) => {
  return (dispatch) => {
    dispatch(signUpRequest());

    axios
      .post("http://localhost:5000/sign_up", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispatch(signUpSuccess(response.data)); // Dispatch success action with received data
      })
      .catch((error) => {
        dispatch(signUpFailure(error.response.data.error)); // Dispatch failure action with error message
      });
  };
};
