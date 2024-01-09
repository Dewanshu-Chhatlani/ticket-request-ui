import * as types from "../types";

const initialState = {
  loading: false,
  ticket: null,
  error: null,
};

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_TICKET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.CREATE_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
        ticket: action.payload,
      };
    case types.CREATE_TICKET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ticketReducer;
