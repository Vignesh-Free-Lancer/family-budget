// Import Async Handler For Async Operation
const asyncHandler = require("express-async-handler");
// Import Expense Schema
const Expense = require("../models/ExpenseModel");

// Expense Create Controller Method
const expenseCreation = asyncHandler(async (req, res) => {
  const {
    month,
    year,
    particular,
    particularsType,
    estimatedCost,
    actualCost,
    paymentType,
    paymentBank,
    paymentDate,
    description,
  } = req.body;

  const expenseDetail = new Expense({
    userId: req.user._id,
    month,
    year,
    particular,
    particularsType,
    estimatedCost,
    actualCost,
    paymentType,
    paymentBank,
    paymentDate,
    description,
  });

  await expenseDetail.save();

  res.status(201).json({
    newExpenseId: expenseDetail._id,
    message: `Your expense item created successfully.`,
  });
});

// Import Expense Controller Method
const expenseImport = asyncHandler(async (req, res) => {
  let expenseDetails = await Expense.find({
    userId: req.user._id,
    month: req.params.month,
    year: req.params.year,
  });

  let clonedArray = [];

  if (expenseDetails.length > 0) {
    clonedArray = JSON.parse(JSON.stringify(expenseDetails));
    clonedArray.forEach((data) => {
      data.userId = req.user._id;
      data.month = `${
        parseInt(req.params.month) === 12 ? 1 : parseInt(req.params.month) + 1
      }`;

      delete data._id;
      delete data.createdAt;
      delete data.updatedAt;
      delete data.__v;
      return data;
    });

    const bulkInsertedStatus = await Expense.insertMany(clonedArray);

    if (expenseDetails.length === bulkInsertedStatus.length) {
      res.status(201).json({
        totalExpenseCount: expenseDetails.length,
        expenseDetails,
        message: "Expense details are imported successfully",
      });
    } else {
      res.status(400);
      throw new Error("Expense records not available");
    }
  } else {
    res.status(401).json({
      totalExpenseCount: expenseDetails.length,
      message: "There is no expense data on last month, Unable to import",
    });
  }
});

// Expense Lists Controller Method
const expenseLists = asyncHandler(async (req, res) => {
  let expenseDetails = await Expense.find({
    userId: req.user._id,
    month: req.params.month,
    year: req.params.year,
  });

  const aggResponse = await Expense.aggregate(
    [
      {
        $match: {
          month: req.params.month,
          year: parseInt(req.params.year),
          userId: req.user._id,
        },
      },
      {
        $group: {
          _id: "$particular",
          expenseCost: { $sum: "$actualCost" },
        },
      },
    ],
    function (err, data) {
      if (err) throw err;
      return data;
    }
  );

  let totalExpenseCost = 0;
  if (expenseDetails.length > 0) {
    for (const doc of aggResponse) {
      totalExpenseCost += doc.expenseCost;
    }
  }

  if (expenseDetails.length > 0) {
    res.status(201).json({
      totalExpenseCount: expenseDetails.length,
      currentMonthExpenseCost: totalExpenseCost,
      expenseDetails,
    });
  } else if (expenseDetails.length === 0) {
    res.status(201).json({
      totalExpenseCount: expenseDetails.length,
      currentMonthExpenseCost: totalExpenseCost,
      message: "There is no data to display",
    });
  } else {
    res.status(401).json({
      message: "Sorry, unable to fetch your data. Please try again.",
    });
  }
});

// Expense By Id Controller Method
const getExpenseById = asyncHandler(async (req, res) => {
  const expenseDetail = await Expense.findById(req.params.expenseId, {
    __v: 0,
  });

  if (expenseDetail) {
    res.status(201).json({
      expenseDetail,
    });
  } else {
    res.status(401).json({
      message: "Sorry, unable to fetch your data. Please try again.",
    });
  }
});

// Expense Update Controller Method
const expenseUpdateById = asyncHandler(async (req, res) => {
  const {
    month,
    year,
    particular,
    particularsType,
    estimatedCost,
    actualCost,
    paymentType,
    paymentBank,
    paymentDate,
    description,
  } = req.body;

  const expense = await Expense.findById(req.params.expenseId, { __v: 0 });

  if (expense.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Access denied.");
  }

  if (expense) {
    expense.month = month || expense.month;
    expense.year = year || expense.year;
    expense.particular = particular || expense.particular;
    expense.particularsType = particularsType || expense.particularsType;
    expense.estimatedCost = estimatedCost || expense.estimatedCost;
    expense.actualCost = actualCost || expense.actualCost;
    expense.paymentType = paymentType || expense.paymentType;
    expense.paymentBank = paymentBank || expense.paymentBank;
    expense.paymentDate = paymentDate || expense.paymentDate;
    expense.description = description || expense.description;

    await expense.save();

    res.status(201).json({
      message: `Expense item updated successfully.`,
    });
  } else {
    res.status(404).json({
      message: "Sorry, unable to process your request. Please try again.",
    });
  }
});

// Expense Delete Controller Method
const expenseDeleteById = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.expenseId, {
    __v: 0,
  });

  if (expense.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Access denied.");
  }

  if (expense) {
    await expense.remove();

    res.status(201).json({
      message: "Your expense item deleted successfully.",
    });
  } else {
    res.status(404).json({
      message: "Sorry, unable to process your request. Please try again.",
    });
  }
});

// Export All Expense API Controller Method
module.exports = {
  expenseCreation,
  expenseImport,
  expenseLists,
  getExpenseById,
  expenseUpdateById,
  expenseDeleteById,
};
