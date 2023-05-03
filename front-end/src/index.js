import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import tasksReducer from './features/tasks/tasksSlice';
import { devToolsEnhancer } from '@redux-devtools/extension';

export const store = configureStore({
  devTools: false,
  reducer: {
    tasks: tasksReducer,
  },
  enhancers: [devToolsEnhancer({ realtime: true })],
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
