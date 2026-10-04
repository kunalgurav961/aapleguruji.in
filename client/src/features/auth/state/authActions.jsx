import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/api";
import { getCurrentUser, loginAccount, logoutAccount, refreshSession, registerAccount } from "../api/authApi";
import { setAccessToken } from "../../../config/api";

const apiError = (error) => error.response?.data || { message: "Unable to complete your request. Please try again." };

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await registerAccount(credentials);
      setAccessToken(response.data.accessToken);
      return response;
    } catch (error) {
      return rejectWithValue(apiError(error));
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginAccount(credentials);
      setAccessToken(response.data.accessToken);
      return response;
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
        const response = await refreshSession();
        setAccessToken(response.data.accessToken);
        return response;
      } catch (refreshError) {
        setAccessToken(null);
        return rejectWithValue(apiError(refreshError));
      }
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutAccount();
      setAccessToken(null);
      return response;
    } catch (error) {
      return rejectWithValue(apiError(error));
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profile, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch("auth/profile", profile);
      return response;
    } catch (error) {
      return rejectWithValue(apiError(error));
    }
  },
);
