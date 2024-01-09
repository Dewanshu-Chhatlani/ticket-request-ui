import axios from "axios";
import * as types from "../types";

export const fetchTicketRequest = () => ({
  type: types.FETCH_TICKET_REQUEST,
});

export const fetchTicketSuccess = (ticketData) => ({
  type: types.FETCH_TICKET_SUCCESS,
  payload: ticketData,
});

export const fetchTicketFailure = (error) => ({
  type: types.FETCH_TICKET_FAILURE,
  payload: error,
});

export const createTicketRequest = () => ({
  type: types.CREATE_TICKET_REQUEST,
});

export const createTicketSuccess = (ticketData) => ({
  type: types.CREATE_TICKET_SUCCESS,
  payload: ticketData,
});

export const createTicketFailure = (error) => ({
  type: types.CREATE_TICKET_FAILURE,
  payload: error,
});

export const deleteTicketRequest = () => ({
  type: types.DELETE_TICKET_REQUEST,
});

export const deleteTicketSuccess = (ticketData) => ({
  type: types.DELETE_TICKET_SUCCESS,
  payload: ticketData,
});

export const deleteTicketFailure = (error) => ({
  type: types.DELETE_TICKET_FAILURE,
  payload: error,
});

export const fetchTicket = (
  page = 1,
  perPage = 10,
  sortBy = "",
  searchQuery = ""
) => {
  return async (dispatch, getState) => {
    dispatch(fetchTicketRequest());

    const { token } = getState().auth.user;

    let listTicketsUrl = `http://localhost:5000/tickets?page=${page}&per_page=${perPage}`;

    if (sortBy) {
      listTicketsUrl += `&sort_by=${sortBy}`;
    }

    if (searchQuery) {
      listTicketsUrl += `&query=${searchQuery}`;
    }

    try {
      const response = await axios.get(listTicketsUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(fetchTicketSuccess(response.data));
    } catch (error) {
      dispatch(fetchTicketFailure(error.message));
    }
  };
};

export const createTicket = (ticketData) => {
  return (dispatch, getState) => {
    dispatch(createTicketRequest());

    const { token } = getState().auth.user;

    axios
      .post("http://localhost:5000/tickets", ticketData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(createTicketSuccess(response.data));
      })
      .catch((error) => {
        dispatch(createTicketFailure(error.message));
      });
  };
};

export const deleteTicket = (ticket) => {
  return async (dispatch, getState) => {
    dispatch(deleteTicketRequest());

    const { token } = getState().auth.user;

    try {
      await axios.delete(`http://localhost:5000/tickets/${ticket.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(deleteTicketSuccess({ id: ticket.id }));
    } catch (error) {
      dispatch(deleteTicketFailure(error.message));
    }
  };
};
