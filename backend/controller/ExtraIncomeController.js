// Import Async Handler For Async Operation
const asyncHandler = require("express-async-handler");
// Import Extra Income Schema
const ExtraIncome = require("../models/ExtraIncomeModel");

// Extra Income Create Controller Method
const extraIncomeCreation = asyncHandler(async (req, res) => {
  const {
    month,
    year,
    incomeDate,
    incomeCreditAmount,
    amountCreditedType,
    amountCreditedBank,
    description,
  } = req.body;

  const extraIncomeDetail = new ExtraIncome({
    userId: req.user._id,
    month,
    year,
    incomeDate,
    incomeCreditAmount,
    amountCreditedType,
    amountCreditedBank,
    description,
  });

  await extraIncomeDetail.save();

  res.status(201).json({
    newExtraIncomeId: extraIncomeDetail._id,
    message: `Your extra income information created successfully.`,
  });
});

// Extra Income Lists Controller Method
const extraIncomeLists = asyncHandler(async (req, res) => {
  const extraIncomeListsResponse = await ExtraIncome.find({
    userId: req.user._id,
    isExtraIncomeActive: true,
  }).sort({
    year: -1,
    month: 1,
  });

  if (extraIncomeListsResponse.length > 0) {
    res.status(201).json({
      totalLength: extraIncomeListsResponse.length,
      extraIncomeListsResponse,
    });
  } else if (extraIncomeListsResponse.length === 0) {
    res.status(201).json({
      totalLength: extraIncomeListsResponse.length,
      message: "There is no data to display",
    });
  } else {
    res.status(400);
    throw new Error("Extra income records not available");
  }
});

// Extra Income By Id Controller Method
const getExtraIncomeById = asyncHandler(async (req, res) => {
  const extraIncomeDataResponse = await ExtraIncome.findById(
    req.params.extraIncomeId,
    {
      __v: 0,
    }
  );

  if (extraIncomeDataResponse) {
    res.status(201).json({
      extraIncomeDataResponse,
    });
  } else {
    res.status(401).json({
      message: "Sorry, unable to fetch your data. Please try again.",
    });
  }
});

// Extra Income Update Controller Method
const extraIncomeUpdateById = asyncHandler(async (req, res) => {
  const {
    month,
    year,
    incomeDate,
    incomeCreditAmount,
    amountCreditedType,
    amountCreditedBank,
    description,
    isExtraIncomeActive,
  } = req.body;

  const extraIncome = await ExtraIncome.findById(req.params.extraIncomeId, {
    __v: 0,
  });

  if (extraIncome.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Access denied.");
  }

  if (extraIncome) {
    extraIncome.month = month || extraIncome.month;
    extraIncome.year = year || extraIncome.year;
    extraIncome.incomeDate = incomeDate || extraIncome.incomeDate;
    extraIncome.incomeCreditAmount =
      incomeCreditAmount || extraIncome.incomeCreditAmount;
    extraIncome.amountCreditedType =
      amountCreditedType || extraIncome.amountCreditedType;
    extraIncome.amountCreditedBank =
      amountCreditedBank || extraIncome.amountCreditedBank;
    extraIncome.description = description || description.pf;
    extraIncome.isExtraIncomeActive =
      isExtraIncomeActive || extraIncome.isExtraIncomeActive;

    await extraIncome.save();

    res.status(201).json({
      message: `Your extra income information updated successfully.`,
    });
  } else {
    res.status(404).json({
      message: "Sorry, unable to process your request. Please try again.",
    });
  }
});

// Extra Income Delete Controller Method
const extraIncomeDeleteById = asyncHandler(async (req, res) => {
  const extraIncome = await ExtraIncome.findById(req.params.extraIncomeId, {
    __v: 0,
  });

  if (extraIncome.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Access denied.");
  }

  if (extraIncome) {
    extraIncome.isExtraIncomeActive = false;

    await extraIncome.save();

    res.status(201).json({
      message: "Your extra income information deleted successfully.",
    });
  } else {
    res.status(404).json({
      message: "Sorry, unable to process your request. Please try again.",
    });
  }
});

// Export All Extra Income API Controller Method
module.exports = {
  extraIncomeCreation,
  extraIncomeLists,
  getExtraIncomeById,
  extraIncomeUpdateById,
  extraIncomeDeleteById,
};
