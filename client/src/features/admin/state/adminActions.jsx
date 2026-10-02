import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/api";

const getApiError = (error) =>
  error.response?.data?.message || "Unable to complete your request. Please try again.";

export const fetchAdminBookings = createAsyncThunk(
  "admin/fetchBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("admin/bookings");
      return response.data.bookings;
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
);

export const fetchAdminUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("admin/users");
      return response.data.users;
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
);

export const fetchAdminPoojas = createAsyncThunk(
  "admin/fetchPoojas",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("booking/poojas");
      return response.data.poojas;
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
);

export const createAdminPooja = createAsyncThunk(
  "admin/createPooja",
  async (pooja, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("admin/poojas", pooja);
      return response.data;
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
);
