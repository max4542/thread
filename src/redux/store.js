import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';  // Default is localStorage
import authReducer from './slices/authSlice';  // Assuming this is your slice for authentication

const persistConfig = {
  key: 'root',  // Key used for persistence
  storage,      // Can use sessionStorage by changing this
  whitelist: ['auth'],  // Only persist the 'auth' slice
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
