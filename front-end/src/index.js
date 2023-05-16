import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import tasksReducer from './features/tasks/tasksSlice';
import projectsReducer from './features/projects/projectsSlice';
import { devToolsEnhancer } from '@redux-devtools/extension';

export const store = configureStore({
  devTools: false,
  reducer: {
    tasks: tasksReducer,
    projects: projectsReducer,
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
