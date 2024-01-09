import * as types from "../types";

const initialState = {
  loading: false,
  ticket: [],
  error: null,
};

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_TICKET_REQUEST:
    case types.CREATE_TICKET_REQUEST:
    case types.DELETE_TICKET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FETCH_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
        ticket: action.payload,
      };
    case types.CREATE_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
        ticket: [action.payload, ...state.ticket],
      };
    case types.DELETE_TICKET_SUCCESS:
      let tickets = [...state.ticket];
      tickets = tickets.filter((ticket) => ticket.id !== action.payload.id);

      return {
        ...state,
        loading: false,
        ticket: tickets,
      };
    case types.FETCH_TICKET_FAILURE:
    case types.CREATE_TICKET_FAILURE:
    case types.DELETE_TICKET_FAILURE:
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
