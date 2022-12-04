const express = require("express");
const router = express.Router();

// Import User Authentication Middleware
const { authUser } = require("../middlewares/AuthMiddleware");

// Import Grocery Controllers
const {
  groceryCreation,
  groceryImport,
  groceryLists,
  getGroceryById,
  groceryUpdateById,
  groceryDeleteById,
  groceryReportLists,
} = require("../controller/GroceryController");

// Grocery route end-point
router.route("/api/grocery/add").post(authUser, groceryCreation);
router.route("/api/grocery/import/:month/:year").get(authUser, groceryImport);
router.route("/api/grocery/lists/:month/:year").get(authUser, groceryLists);
router
  .route("/api/grocery/:groceryId")
  .get(getGroceryById)
  .put(authUser, groceryUpdateById);
router.route("/api/grocery/remove/:groceryId").put(authUser, groceryDeleteById);
router
  .route("/api/grocery/report/:reportType/:month?/:year?")
  .get(authUser, groceryReportLists);

// Export all grocery router end-point
module.exports = router;
