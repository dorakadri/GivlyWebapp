const express = require("express");

const {
  userRegisterCtrl,
  loginUserCtrl,
  fetchUsersCtrl,
  updateUserCtrl,
  updateUserPasswordCtrl,
  banUserCtrl,
  unbanUserCtrl,
  generateVerificationTokenCtrl,
  accountVerificationCtrl,
  forgetPasswordToken,
  passwordResetCtrl,
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


// login if not banned
userRoutes.post("/login", loginUserCtrl);
// Password reset
userRoutes.post("/forget-password-token", forgetPasswordToken);
userRoutes.put("/reset-password", passwordResetCtrl);
//test autorisation
userRoutes.get("/", authMiddleware, isAdmin, fetchUsersCtrl);
// Password

userRoutes.put("/password", authMiddleware, updateUserPasswordCtrl);
userRoutes.post(
  "/generate-verify-email-token",
  authMiddleware,
  generateVerificationTokenCtrl
);
userRoutes.put("/verify-account/", authMiddleware, accountVerificationCtrl);
userRoutes.put("/:id", authMiddleware, updateUserCtrl);
// ban unban user
userRoutes.put("/ban-user/:id", banUserCtrl);
userRoutes.put("/unban-user/:id", unbanUserCtrl);

module.exports = userRoutes;
