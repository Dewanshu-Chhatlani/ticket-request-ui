import axios from "axios";
import * as types from "../types";

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
