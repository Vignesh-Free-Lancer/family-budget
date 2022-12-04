const express = require("express");
const router = express.Router();

// Import User Authentication Middleware
const { authUser } = require("../middlewares/AuthMiddleware");

// Import Expense Controllers
const {
  expenseCreation,
  expenseImport,
  expenseLists,
  getExpenseById,
  expenseUpdateById,
  expenseDeleteById,
  expenseReportLists,
} = require("../controller/ExpenseController");

// Expense route end-point
router.route("/api/expense/add").post(authUser, expenseCreation);
router.route("/api/expense/import/:month/:year").get(authUser, expenseImport);
router.route("/api/expense/lists/:month/:year").get(authUser, expenseLists);
router
  .route("/api/expense/:expenseId")
  .get(getExpenseById)
  .put(authUser, expenseUpdateById);
router.route("/api/expense/remove/:expenseId").put(authUser, expenseDeleteById);
router
  .route("/api/expense/report/:reportType/:month?/:year?")
  .get(authUser, expenseReportLists);

// Export all expense router end-point
module.exports = router;
