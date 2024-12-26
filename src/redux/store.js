import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Ensure this path matches your project structure

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
