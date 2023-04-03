import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlices";
import mainpostReducer from "../slices/posts/mainPostsSlice";
import globalReducer from "../../components/pages/Dashboard/state/index";
import accountVerification from "../slices/accountVerification/accVerificationSlices";
import diyReducer from "../slices/IA/diySlice"
import globalthemeReducer from "../../ReduxB/slices/Themeglobal/index";
const store = configureStore({
  reducer: {
    users: usersReducer,
    dashboard: globalReducer,
    globaltheme:globalthemeReducer,
    accountVerification,
    mainpost:mainpostReducer,
   diy :diyReducer
  },
});

export default store;
