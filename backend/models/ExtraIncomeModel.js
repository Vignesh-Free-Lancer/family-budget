const mongoose = require("mongoose");

const extraIncomeSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    incomeDate: {
      type: Date,
      required: true,
    },
    incomeCreditAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    amountCreditedType: {
      type: String,
      required: true,
    },
    amountCreditedBank: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    isExtraIncomeActive: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const ExtraIncome = mongoose.model("ExtraIncome", extraIncomeSchema);

module.exports = ExtraIncome;
