const express = require("express");
const router = express.Router();

// Import User Authentication Middleware
const { authUser } = require("../middlewares/AuthMiddleware");

// Import Dashboard Controllers
const {
  lastThreeMonthDashboardDetails,
  salaryCurrentMonth,
  extraIncomeCurrentMonth,
  expenseCurrentMonth,
} = require("../controller/DashboardController");

// Dashboard route end-point
router
  .route("/api/dashboard/three-month/dashboard/details")
  .get(authUser, lastThreeMonthDashboardDetails);
router
  .route("/api/dashboard/salary/current-month")
  .get(authUser, salaryCurrentMonth);
router
  .route("/api/dashboard/extra-income/current-month")
  .get(authUser, extraIncomeCurrentMonth);
router
  .route("/api/dashboard/expense/current-month")
  .get(authUser, expenseCurrentMonth);

// Export all salary router end-point
module.exports = router;
