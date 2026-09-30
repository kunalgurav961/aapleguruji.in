import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    booking: null,
  },
  reducers: {
    addBooking: (state, action) => {
      state.booking = action.payload;
    },
  },
});

export const { addBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
