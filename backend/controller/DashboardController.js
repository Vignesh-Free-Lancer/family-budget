// Import Async Handler For Async Operation
const asyncHandler = require("express-async-handler");
// Import Salary Schema
const Salary = require("../models/salaryModel");
// Import Extra Income Schema
const ExtraIncome = require("../models/ExtraIncomeModel");
// Import Expense Schema
const Expense = require("../models/ExpenseModel");

// Last Three Month Salary, Income & Expense Data - Controller Method
const lastThreeMonthDashboardDetails = asyncHandler(async (req, res) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const currentMonth = currentDate.getMonth();
  currentDate.setMonth(currentDate.getMonth() - 2);
  const beforeThreeMonths = currentDate.getMonth();

  const last3Month = { $gte: beforeThreeMonths, $lte: currentMonth };

  // Get Last 2 Month Salalry Details
  const last3MonthSalaryResponse = await Salary.find({
    userId: req.user._id,
    year: currentYear,
    month: last3Month,
    isSalaryActive: true,
  }).sort({
    year: -1,
    month: 1,
  });

  // Get Last 3 Month Salary Netpay
  const last3MonthSalaryNetpay = last3MonthSalaryResponse.map(
    (salary) => salary.netPayAmount
  );

  // Get Last 3 Month Extra Income Details
  const last3MonthExtraIncomeResponse = await ExtraIncome.find({
    userId: req.user._id,
    year: currentYear,
    month: last3Month,
    isExtraIncomeActive: true,
  }).sort({
    year: -1,
    month: 1,
  });

  // Get Last 3 Month Extra Income Credit Amount
  const last3MonthExtraIncomeAmount = last3MonthExtraIncomeResponse.map(
    (extraIncome) => extraIncome.incomeCreditAmount
  );

  const sumArrays = (as) =>
    as.filter((a) => a.length).length
      ? [
          as.filter((a) => a.length).reduce((r, a) => r + a.shift(), 0),
          ...sumArrays(as),
        ]
      : [];

  // Get Last 3 Month Income Details (Salary + Extra Income)
  const last3MonthIncomeAmount = sumArrays([
    last3MonthExtraIncomeAmount,
    last3MonthSalaryNetpay,
  ]);

  // Get Last 3 Month Expense Details
  const last3MonthExpenseResponse = await Expense.aggregate([
    {
      $match: {
        userId: req.user._id,
        year: currentYear,
        month: last3Month,
      },
    },
    {
      $group: {
        _id: "$month",
        reportItems: {
          $push: "$$ROOT",
        },
        monthlyAmount: { $sum: "$actualCost" },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        month: "$_id",
        reportItems: 1,
        monthlyAmount: "$monthlyAmount",
      },
    },
    {
      $project: {
        _id: 0,
        "reportItems.month": 0,
      },
    },
  ]);

  // Get Last 3 Month Expense Amount
  const last3MonthExpenseAmount = last3MonthExpenseResponse.map(
    (expense) => expense.monthlyAmount
  );

  if (
    last3MonthSalaryResponse.length > 0 ||
    last3MonthIncomeAmount.length > 0 ||
    last3MonthExpenseAmount.length > 0
  ) {
    res.status(201).json({
      lastThreeMonthSalary: last3MonthSalaryResponse,
      lastThreeMonthIncome: last3MonthIncomeAmount,
      lastThreeMonthExpense: last3MonthExpenseAmount,
    });
  } else {
    res.status(400);
    throw new Error("Records not available");
  }
});

// Salary Current Month Data - Controller Method
const salaryCurrentMonth = asyncHandler(async (req, res) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  let previousMonth =
    currentDate.getMonth() === 0 ? 12 : currentDate.getMonth();
  let previousYear =
    currentDate.getMonth() === 0
      ? currentDate.getFullYear() - 1
      : currentDate.getFullYear();

  const currentMonthSalaryResponse = await Salary.find({
    userId: req.user._id,
    month: currentMonth,
    year: currentYear,
    isSalaryActive: true,
  });

  const currentMonthSalaryDetails = currentMonthSalaryResponse.find(
    (salaryInfo) => salaryInfo.netPayAmount
  );

  if (currentMonthSalaryResponse.length > 0) {
    res.status(201).json({
      currentMonthSalary: currentMonthSalaryDetails,
    });
  } else if (currentMonthSalaryResponse.length === 0) {
    res.status(201).json({
      totalLength: currentMonthSalaryResponse.length,
      message: "There is no data to display",
    });
  } else {
    res.status(400);
    throw new Error("Salary records not available");
  }
});

// Extra Income Current Month Data - Controller Method
const extraIncomeCurrentMonth = asyncHandler(async (req, res) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  let previousMonth =
    currentDate.getMonth() === 0 ? 12 : currentDate.getMonth();
  let previousYear =
    currentDate.getMonth() === 0
      ? currentDate.getFullYear() - 1
      : currentDate.getFullYear();

  const currentMonthExtraIncomeResponse = await ExtraIncome.find({
    userId: req.user._id,
    month: currentMonth,
    year: currentYear,
    isExtraIncomeActive: true,
  });

  const currentMonthExtraIncomeDetails = currentMonthExtraIncomeResponse.find(
    (extraIncomeInfo) => extraIncomeInfo.incomeCreditAmount
  );

  if (currentMonthExtraIncomeResponse.length > 0) {
    res.status(201).json({
      currentMonthExtraIncome: currentMonthExtraIncomeDetails,
    });
  } else if (currentMonthExtraIncomeResponse.length === 0) {
    res.status(201).json({
      totalLength: currentMonthExtraIncomeResponse.length,
      message: "There is no data to display",
    });
  } else {
    res.status(400);
    throw new Error("Extra income records not available");
  }
});

// Expense Current Month Data - Controller Method
const expenseCurrentMonth = asyncHandler(async (req, res) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  let previousMonth =
    currentDate.getMonth() === 0 ? 12 : currentDate.getMonth();
  let previousYear =
    currentDate.getMonth() === 0
      ? currentDate.getFullYear() - 1
      : currentDate.getFullYear();

  const sumOfMonthlyExpenseReports = await Expense.aggregate(
    [
      {
        $match: {
          userId: req.user._id,
          year: currentYear,
          month: currentMonth,
        },
      },
      {
        $group: {
          _id: "$month",
          totalMonthlyExpenseAmount: { $sum: "$actualCost" },
        },
      },
      { $sort: { _id: 1 } },
    ],
    function (err, data) {
      if (err) throw err;
      return data;
    }
  );

  const currentMonthExpenseDetails = sumOfMonthlyExpenseReports.find(
    (expenseInfo) => expenseInfo.totalMonthlyExpenseAmount
  );

  if (sumOfMonthlyExpenseReports.length > 0) {
    res.status(201).json({
      currentMonthExpense: currentMonthExpenseDetails,
      message: `Your expense reports generated successfully.`,
    });
  } else if (sumOfMonthlyExpenseReports.length === 0) {
    res.status(201).json({
      totalLength: sumOfMonthlyExpenseReports.length,
      message: `There is no data to display`,
    });
  } else {
    res.status(400);
    throw new Error("Expense records not available");
  }
});

// Export All Dashboard API Controller Method
module.exports = {
  lastThreeMonthDashboardDetails,
  salaryCurrentMonth,
  extraIncomeCurrentMonth,
  expenseCurrentMonth,
};
