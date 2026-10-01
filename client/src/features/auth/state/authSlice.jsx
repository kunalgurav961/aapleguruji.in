import { createSlice } from "@reduxjs/toolkit";
import { hydrateUser, loginUser, logoutUser, registerUser } from "./authActions";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isHydrating: true,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    removeUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.isHydrating = false;
        state.user = action.payload.data.user;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.isHydrating = false;
        state.user = action.payload.data.user;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(hydrateUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isHydrating = false;
        state.user = action.payload.data.user;
      })
      .addCase(hydrateUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.isHydrating = false;
        state.user = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
export const { addUser, removeUser } = authSlice.actions;
