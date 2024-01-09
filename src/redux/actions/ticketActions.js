import axios from "axios";
import * as types from "../types";

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
