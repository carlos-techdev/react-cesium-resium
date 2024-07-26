// External Module
const express = require("express");
// Internal Module
const {
  userView,
  userRegister,
  userLogin,
  userEmailVerify,
  userPassChange,
  userForgotPassword,
  userRandStringCheck,
  userResetPassword,
  userDelete,
} = require("../controllers/user.controller.js");
const verifyLoginMiddleware = require("../middlewares/verifyLogin.middleware.js");

// Router Init
const userRoute = express.Router();

// All Student Routes

// User View
userRoute.get("/view", verifyLoginMiddleware, userView());

// User Register
userRoute.post("/register", userRegister());

// User Login
userRoute.post("/login", userLogin());

// User Email Verify
userRoute.post("/verify-email/:username/:randString", userEmailVerify());

// User Change Pass
userRoute.post("/change-pass", verifyLoginMiddleware, userPassChange());

// User Forgot Pass
userRoute.post("/forgot-pass", userForgotPassword());

// User Random String Check
userRoute.post("/check-string/:username/:randString", userRandStringCheck());

// User Reset Password
userRoute.post("/reset-pass/:username/:randString", userResetPassword());

// User Delete User
userRoute.post("/delete-user", verifyLoginMiddleware, userDelete());

module.exports = userRoute;
