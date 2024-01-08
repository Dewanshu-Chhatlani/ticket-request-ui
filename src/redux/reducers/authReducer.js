import * as types from "../types";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_IN_REQUEST:
    case types.SIGN_UP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.SIGN_IN_SUCCESS:
    case types.SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case types.SIGN_IN_FAILURE:
    case types.SIGN_UP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.CLEAR_USER_DATA:
      return {
        ...state,
        loading: false,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
