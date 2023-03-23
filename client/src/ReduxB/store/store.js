import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlices";
import globalReducer from "../../components/pages/Dashboard/state/index";
import accountVerification from "../slices/accountVerification/accVerificationSlices";
import postForum from "../slices/postsForum/postForumSlices";
import comment from "../slices/comments/commentSlices";
const store = configureStore({
  reducer: {
    users: usersReducer,
    dashboard: globalReducer,
    accountVerification,
    postForum,
    comment,
  },
});

export default store;
