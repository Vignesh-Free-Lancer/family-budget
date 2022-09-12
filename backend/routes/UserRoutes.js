const express = require("express");
const router = express.Router();

// Import User Authentication Middleware
const { authUser } = require("../middlewares/AuthMiddleware");

// Import user controllers
const {
  userRegistration,
  userAccountConfirmation,
  userLogin,
  userForgotPassword,
  userAccountActivation,
  getUserById,
  userResetPassword,
  userResetEmail,
  userUpdateById,
  userDeleteById,
  getAllUser,
} = require("../controller/UserController");

// User route end-point
router.route("/api/user/registration").post(userRegistration);
router
  .route("/account/confirmation/success/:token")
  .get(userAccountConfirmation);
router.route("/api/user/login").post(userLogin);
router.route("/api/user/forgot/password/:userEmail").put(userForgotPassword);
router
  .route("/api/user/account/activation/:userEmail")
  .put(userAccountActivation);
router.route("/api/user/reset/password/:userId").put(userResetPassword);
router.route("/api/user/reset/email/:userId").put(userResetEmail);
router.route("/api/user/profile/:userId").get(getUserById).put(userUpdateById);
router.route("/api/user/profile/remove/:userId").put(userDeleteById);
router.route("/api/user/list").get(authUser, getAllUser);

// Export all user router end-point
module.exports = router;
