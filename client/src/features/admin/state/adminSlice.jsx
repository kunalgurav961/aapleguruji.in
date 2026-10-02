import { createSlice } from "@reduxjs/toolkit";
import {
  createAdminPooja,
  fetchAdminBookings,
  fetchAdminPoojas,
  fetchAdminUsers,
} from "./adminActions";

const initialResourceState = {
  items: [],
  isLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    bookings: { ...initialResourceState },
    users: { ...initialResourceState },
    poojas: { ...initialResourceState },
    isCreatingPooja: false,
    createPoojaError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminBookings.pending, (state) => {
        state.bookings.isLoading = true;
        state.bookings.error = null;
      })
      .addCase(fetchAdminBookings.fulfilled, (state, action) => {
        state.bookings.isLoading = false;
        state.bookings.items = action.payload;
      })
      .addCase(fetchAdminBookings.rejected, (state, action) => {
        state.bookings.isLoading = false;
        state.bookings.error = action.payload || action.error.message;
      })
      .addCase(fetchAdminUsers.pending, (state) => {
        state.users.isLoading = true;
        state.users.error = null;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.users.isLoading = false;
        state.users.items = action.payload;
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.users.isLoading = false;
        state.users.error = action.payload || action.error.message;
      })
      .addCase(fetchAdminPoojas.pending, (state) => {
        state.poojas.isLoading = true;
        state.poojas.error = null;
      })
      .addCase(fetchAdminPoojas.fulfilled, (state, action) => {
        state.poojas.isLoading = false;
        state.poojas.items = action.payload;
      })
      .addCase(fetchAdminPoojas.rejected, (state, action) => {
        state.poojas.isLoading = false;
        state.poojas.error = action.payload || action.error.message;
      })
      .addCase(createAdminPooja.pending, (state) => {
        state.isCreatingPooja = true;
        state.createPoojaError = null;
      })
      .addCase(createAdminPooja.fulfilled, (state, action) => {
        state.isCreatingPooja = false;
        state.poojas.items = [action.payload.pooja, ...state.poojas.items];
      })
      .addCase(createAdminPooja.rejected, (state, action) => {
        state.isCreatingPooja = false;
        state.createPoojaError = action.payload || action.error.message;
      });
  },
});

export default adminSlice.reducer;
