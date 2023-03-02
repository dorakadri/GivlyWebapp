const express = require("express");
const {
  userRegisterCtrl,
  loginUserCtrl,
  fetchUsersCtrl,
  updateUserCtrl,
  updateUserPasswordCtrl,
  banUserCtrl,
  unbanUserCtrl,
} = require("../../controllers/users/usersCtrl");
const {
  authMiddleware,
  isAdmin,
} = require("../../middlewares/auth/authMiddleware");

const {
  profilePhotoUpload,
  profilePhotoResize,
} = require("../../middlewares/uploads/profilePhotoUpload");

const userRoutes = express.Router();
//done
userRoutes.post(
  "/register",
  profilePhotoUpload.single("profilePhoto"),
  profilePhotoResize,
  userRegisterCtrl
);
//done
userRoutes.post("/login", loginUserCtrl);

//test autorisation
userRoutes.get("/", authMiddleware, isAdmin, fetchUsersCtrl);
// Password

userRoutes.put("/password", authMiddleware, updateUserPasswordCtrl);

userRoutes.put("/:id", authMiddleware, updateUserCtrl);
userRoutes.put("/ban-user/:id", banUserCtrl);
userRoutes.put("/unban-user/:id" , unbanUserCtrl);
module.exports = userRoutes;
