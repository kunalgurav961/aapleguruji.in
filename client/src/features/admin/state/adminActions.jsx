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

export const fetchAdminDashboard = createAsyncThunk(
  "admin/fetchDashboard",
  async (period = "month", { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("admin/dashboard", {
        params: { period },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
);

export const searchAdminRecords = createAsyncThunk(
  "admin/searchRecords",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("admin/search", {
        params: { q: query },
      });
      return response.data.results;
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
);

export const updateAdminBookingStatus = createAsyncThunk(
  "admin/updateBookingStatus",
  async ({ bookingId, bookingStatus }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `admin/bookings/${bookingId}/status`,
        { bookingStatus },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
);

export const updatePanditApplicationStatus = createAsyncThunk(
  "admin/updatePanditApplicationStatus",
  async ({ panditId, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `admin/pandits/${panditId}/status`,
        { status },
      );
      return response.data;
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

export const fetchAdminPandits = createAsyncThunk(
  "admin/fetchPandits",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("admin/pandits");
      return response.data.pandits;
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
      const response = await axiosInstance.post("admin/poojas", pooja, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
);

export const fetchAdminReviews = createAsyncThunk(
  "admin/fetchReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("admin/reviews");
      return response.data.reviews;
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
);

export const createAdminReview = createAsyncThunk(
  "admin/createReview",
  async (review, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("admin/reviews", review);
      return response.data;
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
);

export const fetchAdminBlogs = createAsyncThunk(
  "admin/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("admin/blogs");
      return response.data.blogs;
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
);

export const createAdminBlog = createAsyncThunk(
  "admin/createBlog",
  async (blog, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("admin/blogs", blog, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
);

export const updateAdminBlogStatus = createAsyncThunk(
  "admin/updateBlogStatus",
  async ({ blogId, isPublished }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `admin/blogs/${blogId}/status`,
        { isPublished },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
);
