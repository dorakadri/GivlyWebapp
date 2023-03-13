import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlices";
import globalReducer from '../../components/pages/Dashboard/state/index';
const store = configureStore({
  reducer: {
    users: usersReducer,
    dashboard: globalReducer,
  },
});

export default store;
