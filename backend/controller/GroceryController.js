// Import Async Handler For Async Operation
const asyncHandler = require("express-async-handler");
// Import Grocery Schema
const Grocery = require("../models/GroceryModel");
// Import Month List For Display The Month Name
const monthsList = require("../utils/Utils");

// Grocery Create Controller Method
const groceryCreation = asyncHandler(async (req, res) => {
  const { month, year, particulars, qty, unitPrice, totalPrice } = req.body;

  const groceryDetail = new Grocery({
    userId: req.user._id,
    month,
    year,
    particulars,
    qty,
    unitPrice,
    totalPrice,
  });

  await groceryDetail.save();

  res.status(201).json({
    newGroceryId: groceryDetail._id,
    message: `Your grocery item created successfully.`,
  });
});

// Import Grocery Controller Method
const groceryImport = asyncHandler(async (req, res) => {
  let groceryItems = await Grocery.find({
    userId: req.user._id,
    month: req.params.month,
    year: req.params.year,
  });

  let clonedArray = [];

  if (groceryItems.length > 0) {
    clonedArray = JSON.parse(JSON.stringify(groceryItems));
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

    const bulkInsertedStatus = await Grocery.insertMany(clonedArray);

    if (groceryItems.length === bulkInsertedStatus.length) {
      res.status(201).json({
        totalGroceryItems: groceryItems.length,
        groceryItems,
        message: "Grocery items are imported successfully",
      });
    } else {
      res.status(400);
      throw new Error("Grocery records not available");
    }
  } else {
    res.status(401).json({
      totalGroceryItems: groceryItems.length,
      message: "There is no grocery data on last month, Unable to import",
    });
  }
});

// Grocery Lists Controller Method
const groceryLists = asyncHandler(async (req, res) => {
  let groceryItems = await Grocery.find({
    userId: req.user._id,
    month: req.params.month,
    year: req.params.year,
  });

  const aggResponse = await Grocery.aggregate(
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
          _id: "$particulars",
          totalUnitPrice: { $sum: "$unitPrice" },
          totalPrice: { $sum: "$totalPrice" },
        },
      },
    ],
    function (err, data) {
      if (err) throw err;
      return data;
    }
  );

  let perMonthTotalUnitPrice = 0,
    perMonthTotalPrice = 0;
  if (groceryItems.length > 0) {
    for (const doc of aggResponse) {
      perMonthTotalUnitPrice += doc.totalUnitPrice;
      perMonthTotalPrice += doc.totalPrice;
    }
  }

  if (groceryItems.length > 0) {
    res.status(201).json({
      totalGroceryItems: groceryItems.length,
      currentMonthTotalUnitPrice: perMonthTotalUnitPrice,
      currentMonthTotalPrice: perMonthTotalPrice,
      groceryItems,
    });
  } else if (groceryItems.length === 0) {
    res.status(201).json({
      totalGroceryItems: groceryItems.length,
      currentMonthTotalUnitPrice: perMonthTotalUnitPrice,
      currentMonthTotalPrice: perMonthTotalPrice,
      message: "There is no data to display",
    });
  } else {
    res.status(401).json({
      message: "Sorry, unable to fetch your data. Please try again.",
    });
  }
});

// Grocery By Id Controller Method
const getGroceryById = asyncHandler(async (req, res) => {
  const groceryDetail = await Grocery.findById(req.params.groceryId, {
    __v: 0,
  });

  if (groceryDetail) {
    res.status(201).json({
      groceryDetail,
    });
  } else {
    res.status(401).json({
      message: "Sorry, unable to fetch your data. Please try again.",
    });
  }
});

// Grocery Update Controller Method
const groceryUpdateById = asyncHandler(async (req, res) => {
  const { month, year, particulars, qty, unitPrice, totalPrice } = req.body;

  const grocery = await Grocery.findById(req.params.groceryId, { __v: 0 });

  if (grocery.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Access denied.");
  }

  if (grocery) {
    grocery.month = month || grocery.month;
    grocery.year = year || grocery.year;
    grocery.particulars = particulars || grocery.particulars;
    grocery.qty = qty || grocery.qty;
    grocery.unitPrice = unitPrice || grocery.unitPrice;
    grocery.totalPrice = totalPrice || grocery.totalPrice;

    await grocery.save();

    res.status(201).json({
      message: `Grocery item updated successfully.`,
    });
  } else {
    res.status(404).json({
      message: "Sorry, unable to process your request. Please try again.",
    });
  }
});

// Grocery Delete Controller Method
const groceryDeleteById = asyncHandler(async (req, res) => {
  const grocery = await Grocery.findById(req.params.groceryId, {
    __v: 0,
  });

  if (grocery.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Access denied.");
  }

  if (grocery) {
    await grocery.remove();

    res.status(201).json({
      message: "Your grocery item deleted successfully.",
    });
  } else {
    res.status(404).json({
      message: "Sorry, unable to process your request. Please try again.",
    });
  }
});

// Grocery Reports Controller Method
const groceryReportLists = asyncHandler(async (req, res) => {
  const { reportType, month, year } = req.params;
  const currentDate = new Date();

  let reportMonth = 0,
    reportYear = 0,
    groceryReportResults = [],
    groupedGroceryData,
    sumOfYearlyGroceryReports = [],
    sumOfMonthlyGroceryReports = [];

  if (reportType === "this-month") {
    reportMonth = currentDate.getMonth() + 1;
    reportYear = currentDate.getFullYear();
  } else if (reportType === "last-month") {
    reportMonth = currentDate.getMonth();
    reportYear = currentDate.getFullYear();
  } else if (reportType === "last-3-month") {
    const currentMonth = currentDate.getMonth();
    currentDate.setMonth(currentDate.getMonth() - 2);
    const beforeThreeMonths = currentDate.getMonth();

    reportMonth = { $gte: beforeThreeMonths, $lte: currentMonth };
    reportYear = currentDate.getFullYear();
  } else if (reportType === "last-6-month") {
    const currentMonth = currentDate.getMonth();
    currentDate.setMonth(currentDate.getMonth() - 5);
    const beforeSixMonths = currentDate.getMonth();

    reportMonth = { $gte: beforeSixMonths, $lte: currentMonth };
    reportYear = currentDate.getFullYear();
  } else if (reportType === "this-year") {
    reportYear = currentDate.getFullYear();
  } else if (reportType === "last-year") {
    reportYear = currentDate.getFullYear() - 1;
  } else if (reportType === "custom-year") {
    reportYear = parseInt(year);
  } else if (reportType === "custom-range") {
    reportMonth = parseInt(month);
    reportYear = parseInt(year);
  }

  if (
    reportType === "this-month" ||
    reportType === "last-month" ||
    reportType === "last-3-month" ||
    reportType === "last-6-month" ||
    reportType === "custom-range"
  ) {
    groceryReportResults = await Grocery.find({
      userId: req.user._id,
      year: reportYear,
      month: reportMonth,
    }).sort({
      year: -1,
      month: 1,
    });

    groupedGroceryData = await Grocery.aggregate([
      {
        $match: {
          userId: req.user._id,
          year: reportYear,
          month: reportMonth,
        },
      },
      {
        $group: {
          _id: "$month",
          reportItems: {
            $push: "$$ROOT",
          },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          month: "$_id",
          reportItems: 1,
        },
      },
      {
        $project: {
          _id: 0,
          "reportItems.month": 0,
        },
      },
    ]);

    sumOfMonthlyGroceryReports = await Grocery.aggregate(
      [
        {
          $match: {
            userId: req.user._id,
            year: reportYear,
            month: reportMonth,
          },
        },
        {
          $group: {
            _id: "$month",
            totalMonthlyGroceryAmount: { $sum: "$totalPrice" },
          },
        },
        { $sort: { _id: 1 } },
      ],
      function (err, data) {
        if (err) throw err;
        return data;
      }
    );
  } else if (
    reportType === "this-year" ||
    reportType === "last-year" ||
    reportType === "custom-year"
  ) {
    groceryReportResults = await Grocery.find({
      userId: req.user._id,
      year: reportYear,
    }).sort({
      month: 1,
    });

    groupedGroceryData = await Grocery.aggregate([
      {
        $match: {
          userId: req.user._id,
          year: reportYear,
        },
      },
      {
        $group: {
          _id: "$month",
          reportItems: {
            $push: "$$ROOT",
          },
          monthlyAmount: { $sum: "$totalPrice" },
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

    sumOfYearlyGroceryReports = await Grocery.aggregate(
      [
        {
          $match: {
            userId: req.user._id,
            year: reportYear,
          },
        },
        {
          $group: {
            _id: "$userId",
            totalYearlyGroceryAmount: { $sum: "$totalPrice" },
          },
        },
      ],
      function (err, data) {
        if (err) throw err;
        return data;
      }
    );
  }

  // Get total monthly grocery amount
  let totalMonthlyGroceryReportAmount = 0;
  sumOfMonthlyGroceryReports.forEach((report) => {
    totalMonthlyGroceryReportAmount =
      parseFloat(totalMonthlyGroceryReportAmount) +
      parseFloat(report.totalMonthlyGroceryAmount);
  });

  // Get total yearly grocery amount
  const totalYearlyGroceryReportAmount = sumOfYearlyGroceryReports.find(
    (report) => report
  );

  if (groceryReportResults.length > 0) {
    res.status(201).json({
      totalReportLength: groceryReportResults.length,
      groupedGroceryData,
      groceryReportResults,
      yearlyGroceryReport: totalYearlyGroceryReportAmount,
      sumOfTotalMonthlyGroceryReport: totalMonthlyGroceryReportAmount,
      monthlyGroceryReport: sumOfMonthlyGroceryReports,
      message: `Your grocery reports generated successfully on ${
        reportType === "custom-year"
          ? `year - ${reportYear}`
          : reportType === "custom-range"
          ? `${monthsList[reportMonth - 1].name} - ${reportYear}`
          : reportType
      }.`,
    });
  } else if (groceryReportResults.length === 0) {
    res.status(201).json({
      totalReportLength: groceryReportResults.length,
      message: `There is no data to display on ${
        reportType === "custom-year"
          ? `year - ${reportYear}`
          : reportType === "custom-range"
          ? `${monthsList[reportMonth - 1].name} - ${reportYear}`
          : reportType
      }`,
    });
  } else {
    res.status(400);
    throw new Error("Grocery records not available");
  }
});

// Export All Grocery API Controller Method
module.exports = {
  groceryCreation,
  groceryImport,
  groceryLists,
  getGroceryById,
  groceryUpdateById,
  groceryDeleteById,
  groceryReportLists,
};
