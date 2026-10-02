import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "../features/booking/state/bookingSlice";
import authReducer from "../features/auth/state/authSlice";
import adminReducer from "../features/admin/state/adminSlice";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    auth: authReducer,
    admin: adminReducer,
  },
});
