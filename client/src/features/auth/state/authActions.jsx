import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser, loginAccount, logoutAccount, refreshSession, registerAccount } from "../api/authApi";

const apiError = (error) => error.response?.data || { message: "Unable to complete your request. Please try again." };

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      return await registerAccount(credentials);
    } catch (error) {
      return rejectWithValue(apiError(error));
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      return await loginAccount(credentials);
    } catch (error) {
      return rejectWithValue(apiError(error));
    }
  },
);

export const hydrateUser = createAsyncThunk(
  "auth/hydrate",
  async (_, { rejectWithValue }) => {
    try {
      return await getCurrentUser();
    } catch (error) {
      try {
        return await refreshSession();
      } catch (refreshError) {
        return rejectWithValue(apiError(refreshError));
      }
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      return await logoutAccount();
    } catch (error) {
      return rejectWithValue(apiError(error));
    }
  },
);
