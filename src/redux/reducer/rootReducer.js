import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { roomReducer } from "./habitacionReducer";
import { reserveReducer } from "./reserveReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  room: roomReducer,
  bookings: reserveReducer,
});

export default rootReducer;
