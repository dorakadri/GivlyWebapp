
import React from 'react';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './state';

import DashboardRoutes from './DashboardRoutes';


const store = configureStore({
  reducer: {
    dashboard: globalReducer,
  },
});

function Dashboard() {
  return (
    <Provider store={store}>

      <DashboardRoutes />
   
    </Provider>
  );
}

export default Dashboard;
