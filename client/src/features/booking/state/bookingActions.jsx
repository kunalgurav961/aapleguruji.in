import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/api";

const getApiError = (error) =>
  error.response?.data?.message || "Unable to complete your request. Please try again.";

export const fetchPoojaOptions = createAsyncThunk(
  "booking/fetchPoojaOptions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("booking/poojas");
      return response.data.poojas;
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
);

export const bookPooja = createAsyncThunk(
  "booking/create",
  async (bookingDetails, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "booking/create",
        bookingDetails,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
);

export const fetchMyBookings = createAsyncThunk(
  "booking/fetchMine",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("booking/mine");
      return response.data.bookings;
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
);
