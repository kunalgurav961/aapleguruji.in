import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "../features/booking/state/bookingSlice";
import authReducer from "../features/auth/state/authSlice";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    auth: authReducer,
  },
});
