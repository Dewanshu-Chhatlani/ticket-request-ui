import * as types from "../types";

const initialState = {
  loading: false,
  ticket: [],
  total_count: 0,
  error: null,
};

const ticketReducer = (state = initialState, action) => {
  let tickets = [...state.ticket];

  switch (action.type) {
    case types.FETCH_TICKET_REQUEST:
    case types.CREATE_TICKET_REQUEST:
    case types.UPDATE_TICKET_REQUEST:
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
        ticket: action.payload.records,
        total_count: action.payload.total_count,
      };
    case types.CREATE_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
        ticket: [action.payload, ...state.ticket],
        total_count: state.total_count + 1,
      };
    case types.UPDATE_TICKET_SUCCESS:
      const ticketIndex = tickets.findIndex(
        (ticket) => ticket.id === action.payload.id
      );

      tickets[ticketIndex] = { ...action.payload };

      return {
        ...state,
        loading: false,
        ticket: [...tickets],
      };
    case types.DELETE_TICKET_SUCCESS:
      tickets = tickets.filter((ticket) => ticket.id !== action.payload.id);

      return {
        ...state,
        loading: false,
        ticket: tickets,
        total_count: state.total_count - 1,
      };
    case types.FETCH_TICKET_FAILURE:
    case types.CREATE_TICKET_FAILURE:
    case types.UPDATE_TICKET_FAILURE:
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
