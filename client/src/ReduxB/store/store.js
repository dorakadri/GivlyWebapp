import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlices";
import globalReducer from '../../components/pages/Dashboard/state/index';
import accountVerification from '../slices/accountVerification/accVerificationSlices';

const store = configureStore({
  reducer: {
    users: usersReducer,
    dashboard: globalReducer,
    accountVerification,
  },
});

export default store;
