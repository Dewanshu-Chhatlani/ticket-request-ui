import { combineReducers } from "redux";
import authReducer from "./authReducer";
import ticketReducer from "./ticketReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  ticket: ticketReducer,
  // Add other reducers here
});

export default rootReducer;
