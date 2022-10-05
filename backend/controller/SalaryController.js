// Import Async Handler For Async Operation
const asyncHandler = require("express-async-handler");
// Import Salary Schema
const Salary = require("../models/salaryModel");

// Salary Create Controller Method
const salaryCreation = asyncHandler(async (req, res) => {
  const {
    month,
    year,
    monthlySalary,
    bonusAmount,
    otherAllowance,
    totalCR,
    pf,
    incomeTax,
    professionalTax,
    otherDeductions,
    totalDR,
    netPayAmount,
  } = req.body;

  const salaryDetail = new Salary({
    userId: req.user._id,
    month,
    year,
    monthlySalary,
    bonusAmount,
    otherAllowance,
    totalCR,
    pf,
    incomeTax,
    professionalTax,
    otherDeductions,
    totalDR,
    netPayAmount,
  });

  await salaryDetail.save();

  res.status(201).json({
    newSalaryId: salaryDetail._id,
    message: `Your salary information created successfully.`,
  });
});

// Salary Lists Controller Method
const salaryLists = asyncHandler(async (req, res) => {
  const salaryListsResponse = await Salary.find({
    userId: req.user._id,
    isSalaryActive: true,
  }).sort({
    year: -1,
    month: 1,
  });

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const previousMonth = currentDate.getMonth();

  const lastMonthSalaryDetails = salaryListsResponse.filter(
    (salaryData) =>
      parseInt(salaryData.month) === previousMonth &&
      parseInt(salaryData.year) === currentYear
  );

  if (salaryListsResponse.length > 0) {
    res.status(201).json({
      totalLength: salaryListsResponse.length,
      lastMonthSalary: lastMonthSalaryDetails,
      salaryListsResponse,
    });
  } else if (salaryListsResponse.length === 0) {
    res.status(201).json({
      totalLength: salaryListsResponse.length,
      message: "There is no data to display",
    });
  } else {
    res.status(400);
    throw new Error("Salary records not available");
  }
});

// Salary By Id Controller Method
const getSalaryById = asyncHandler(async (req, res) => {
  const salaryDataResponse = await Salary.findById(req.params.salaryId, {
    __v: 0,
  });

  if (salaryDataResponse) {
    res.status(201).json({
      salaryDataResponse,
    });
  } else {
    res.status(401).json({
      message: "Sorry, unable to fetch your data. Please try again.",
    });
  }
});

// Salary Update Controller Method
const salaryUpdateById = asyncHandler(async (req, res) => {
  const {
    month,
    year,
    monthlySalary,
    bonusAmount,
    otherAllowance,
    totalCR,
    pf,
    incomeTax,
    professionalTax,
    otherDeductions,
    totalDR,
    netPayAmount,
    isSalaryActive,
  } = req.body;

  const salary = await Salary.findById(req.params.salaryId, { __v: 0 });

  if (salary.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Access denied.");
  }

  if (salary) {
    salary.month = month || salary.month;
    salary.year = year || salary.year;
    salary.monthlySalary = monthlySalary || salary.monthlySalary;
    salary.bonusAmount = bonusAmount || salary.bonusAmount;
    salary.otherAllowance = otherAllowance || salary.otherAllowance;
    salary.totalCR = totalCR || salary.totalCR;
    salary.pf = pf || salary.pf;
    salary.incomeTax = incomeTax || salary.incomeTax;
    salary.professionalTax = professionalTax || salary.professionalTax;
    salary.otherDeductions = otherDeductions || salary.otherDeductions;
    salary.totalDR = totalDR || salary.totalDR;
    salary.netPayAmount = netPayAmount || salary.netPayAmount;
    salary.isSalaryActive = isSalaryActive || salary.isSalaryActive;

    await salary.save();

    res.status(201).json({
      message: `Your salary information updated successfully.`,
    });
  } else {
    res.status(404).json({
      message: "Sorry, unable to process your request. Please try again.",
    });
  }
});

// Salary Delete Controller Method
const salaryDeleteById = asyncHandler(async (req, res) => {
  const salary = await Salary.findById(req.params.salaryId, { __v: 0 });

  if (salary.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Access denied.");
  }

  if (salary) {
    salary.isSalaryActive = false;

    await salary.save();

    res.status(201).json({
      message: "Your salary information deleted successfully.",
    });
  } else {
    res.status(404).json({
      message: "Sorry, unable to process your request. Please try again.",
    });
  }
});

// Export All Salary API Controller Method
module.exports = {
  salaryCreation,
  salaryLists,
  getSalaryById,
  salaryUpdateById,
  salaryDeleteById,
};
