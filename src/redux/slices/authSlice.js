// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
  loading: false,
  error: '',  // Store error message in Redux state
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = '';  // Reset error on login start
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.token = action?.payload?.token || 'ddd';
      state.user = action?.payload?.user || 'ddd';
      state.error = '';  // Reset error on login success
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action?.payload || 'Login failed. Please try again.';  // Set error message
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.loading = false;
      state.error = '';  // Clear error on logout
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
