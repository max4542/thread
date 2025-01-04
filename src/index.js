
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store, persistor } from './redux/store';  // Update with the correct path
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>
);

