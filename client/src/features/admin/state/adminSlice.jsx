import { createSlice } from "@reduxjs/toolkit";
import {
  createAdminPooja,
  createAdminBlog,
  createAdminReview,
  fetchAdminBookings,
  fetchAdminBlogs,
  fetchAdminDashboard,
  fetchAdminPandits,
  fetchAdminPoojas,
  fetchAdminReviews,
  fetchAdminUsers,
  searchAdminRecords,
  updateAdminBookingStatus,
  updateAdminBlogStatus,
  updatePanditApplicationStatus,
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
    pandits: { ...initialResourceState },
    poojas: { ...initialResourceState },
    reviews: { ...initialResourceState },
    blogs: { ...initialResourceState },
    dashboard: { data: null, isLoading: false, error: null },
    search: { results: [], isLoading: false, error: null, currentRequestId: null },
    isCreatingPooja: false,
    createPoojaError: null,
    isCreatingReview: false,
    createReviewError: null,
    isCreatingBlog: false,
    createBlogError: null,
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
      .addCase(fetchAdminDashboard.pending, (state) => {
        state.dashboard.isLoading = true;
        state.dashboard.error = null;
      })
      .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
        state.dashboard.isLoading = false;
        state.dashboard.data = action.payload;
      })
      .addCase(fetchAdminDashboard.rejected, (state, action) => {
        state.dashboard.isLoading = false;
        state.dashboard.error = action.payload || action.error.message;
      })
      .addCase(searchAdminRecords.pending, (state, action) => {
        state.search.currentRequestId = action.meta.requestId;
        state.search.isLoading = true;
        state.search.error = null;
      })
      .addCase(searchAdminRecords.fulfilled, (state, action) => {
        if (state.search.currentRequestId !== action.meta.requestId) return;
        state.search.isLoading = false;
        state.search.results = action.payload;
        state.search.currentRequestId = null;
      })
      .addCase(searchAdminRecords.rejected, (state, action) => {
        if (state.search.currentRequestId !== action.meta.requestId) return;
        state.search.isLoading = false;
        state.search.error = action.payload || action.error.message;
        state.search.currentRequestId = null;
      })
      .addCase(updateAdminBookingStatus.fulfilled, (state, action) => {
        const updated = action.payload.booking;
        state.bookings.items = state.bookings.items.map((booking) =>
          booking._id === updated._id ? updated : booking,
        );
        if (state.dashboard.data) {
          state.dashboard.data.recentBookings =
            state.dashboard.data.recentBookings.map((booking) =>
              booking._id === updated._id ? updated : booking,
            );
        }
      })
      .addCase(updatePanditApplicationStatus.fulfilled, (state, action) => {
        state.pandits.items = state.pandits.items.filter(
          (pandit) => pandit._id !== action.payload.pandit._id,
        );
        if (state.dashboard.data) {
          state.dashboard.data.pendingPandits =
            state.dashboard.data.pendingPandits.filter(
              (pandit) => pandit._id !== action.payload.pandit._id,
            );
          state.dashboard.data.metrics.pendingPanditApplications = Math.max(
            0,
            state.dashboard.data.metrics.pendingPanditApplications - 1,
          );
        }
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
      .addCase(fetchAdminPandits.pending, (state) => {
        state.pandits.isLoading = true;
        state.pandits.error = null;
      })
      .addCase(fetchAdminPandits.fulfilled, (state, action) => {
        state.pandits.isLoading = false;
        state.pandits.items = action.payload;
      })
      .addCase(fetchAdminPandits.rejected, (state, action) => {
        state.pandits.isLoading = false;
        state.pandits.error = action.payload || action.error.message;
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
      })
      .addCase(fetchAdminBlogs.pending, (state) => {
        state.blogs.isLoading = true;
        state.blogs.error = null;
      })
      .addCase(fetchAdminBlogs.fulfilled, (state, action) => {
        state.blogs.isLoading = false;
        state.blogs.items = action.payload;
      })
      .addCase(fetchAdminBlogs.rejected, (state, action) => {
        state.blogs.isLoading = false;
        state.blogs.error = action.payload || action.error.message;
      })
      .addCase(createAdminBlog.pending, (state) => {
        state.isCreatingBlog = true;
        state.createBlogError = null;
      })
      .addCase(createAdminBlog.fulfilled, (state, action) => {
        state.isCreatingBlog = false;
        state.blogs.items = [action.payload.blog, ...state.blogs.items];
      })
      .addCase(createAdminBlog.rejected, (state, action) => {
        state.isCreatingBlog = false;
        state.createBlogError = action.payload || action.error.message;
      })
      .addCase(updateAdminBlogStatus.fulfilled, (state, action) => {
        state.blogs.items = state.blogs.items.map((blog) =>
          blog._id === action.payload.blog._id ? action.payload.blog : blog,
        );
      })
      .addCase(fetchAdminReviews.pending, (state) => {
        state.reviews.isLoading = true;
        state.reviews.error = null;
      })
      .addCase(fetchAdminReviews.fulfilled, (state, action) => {
        state.reviews.isLoading = false;
        state.reviews.items = action.payload;
      })
      .addCase(fetchAdminReviews.rejected, (state, action) => {
        state.reviews.isLoading = false;
        state.reviews.error = action.payload || action.error.message;
      })
      .addCase(createAdminReview.pending, (state) => {
        state.isCreatingReview = true;
        state.createReviewError = null;
      })
      .addCase(createAdminReview.fulfilled, (state, action) => {
        state.isCreatingReview = false;
        state.reviews.items = [action.payload.review, ...state.reviews.items];
      })
      .addCase(createAdminReview.rejected, (state, action) => {
        state.isCreatingReview = false;
        state.createReviewError = action.payload || action.error.message;
      });
  },
});

export default adminSlice.reducer;
