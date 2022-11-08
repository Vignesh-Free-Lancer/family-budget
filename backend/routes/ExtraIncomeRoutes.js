const express = require("express");
const router = express.Router();

// Import User Authentication Middleware
const { authUser } = require("../middlewares/AuthMiddleware");

// Import Extra Income Controllers
const {
  extraIncomeCreation,
  extraIncomeLists,
  getExtraIncomeById,
  extraIncomeUpdateById,
  extraIncomeDeleteById,
} = require("../controller/ExtraIncomeController");

// Extra income route end-point
router.route("/api/extra-income/add").post(authUser, extraIncomeCreation);
router.route("/api/extra-income/lists").get(authUser, extraIncomeLists);
router
  .route("/api/extra-income/:extraIncomeId")
  .get(getExtraIncomeById)
  .put(authUser, extraIncomeUpdateById);
router
  .route("/api/extra-income/remove/:extraIncomeId")
  .put(authUser, extraIncomeDeleteById);

// Export all extra income router end-point
module.exports = router;
