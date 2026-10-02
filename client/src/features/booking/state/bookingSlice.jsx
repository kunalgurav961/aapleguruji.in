import { createSlice } from "@reduxjs/toolkit";
import { bookPooja, fetchPoojaOptions } from "./bookingActions";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    booking: null,
    poojaOptions: [],
    isLoadingPoojas: false,
    poojaError: null,
    isSubmitting: false,
    submitError: null,
    createdBooking: null,
  },
  reducers: {
    addBooking: (state, action) => {
      state.booking = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPoojaOptions.pending, (state) => {
        state.isLoadingPoojas = true;
        state.poojaError = null;
      })
      .addCase(fetchPoojaOptions.fulfilled, (state, action) => {
        state.isLoadingPoojas = false;
        state.poojaOptions = action.payload;
      })
      .addCase(fetchPoojaOptions.rejected, (state, action) => {
        state.isLoadingPoojas = false;
        state.poojaError = action.payload || action.error.message;
      })
      .addCase(bookPooja.pending, (state) => {
        state.isSubmitting = true;
        state.submitError = null;
        state.createdBooking = null;
      })
      .addCase(bookPooja.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.createdBooking = action.payload.booking;
      })
      .addCase(bookPooja.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitError = action.payload || action.error.message;
      });
  },
});

export const { addBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
