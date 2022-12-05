import { Button } from "react-bootstrap";
import getYear from "date-fns/getYear";
import i18n from "../i18n/i18n";

// Array of Month Name
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Month List
export const monthsList = [
  { value: "1", name: "January" },
  { value: "2", name: "February" },
  { value: "3", name: "March" },
  { value: "4", name: "April" },
  { value: "5", name: "May" },
  { value: "6", name: "June" },
  { value: "7", name: "July" },
  { value: "8", name: "August" },
  { value: "9", name: "September" },
  { value: "10", name: "October" },
  { value: "11", name: "November" },
  { value: "12", name: "December" },
];

const baseyear = 2000;
const currentDate = new Date();
let currentYear = currentDate.getFullYear();

const getAllYear = () => {
  let allyear = [];
  for (let i = baseyear; i <= currentYear; i++) {
    allyear.push({ value: i, name: i });
  }
  allyear = allyear.sort(function (a, b) {
    return b.value - a.value;
  });
  return allyear;
};

// To Get Year Automatically Based on Base & Current Year
export const yearsList = getAllYear();

// Get year from start to end
export const range = (start, end) => {
  return new Array(end - start).fill().map((d, i) => i + start);
};

// Get year from 1960 to 18years before from current
// export const years = range(1990, getYear(new Date()) + 1, 1);
export const dobYears = range(
  1970,
  getYear(new Date(new Date().setFullYear(new Date().getFullYear() - 17)))
);

// Get year dropdown for form filling except user dob
export const getDefaultYears = range(
  2000,
  getYear(new Date(new Date().setFullYear(new Date().getFullYear() + 1)))
);

// Restrict DOB Min 18 Years & Max 75 Years
export const minAge = new Date(
  new Date().setFullYear(new Date().getFullYear() - 18)
);
export const maxAge = new Date(new Date().setFullYear(1970));

// Convert Month Number Into Month String
export const monthName = (monthNumber) => {
  const curDate = new Date();
  curDate.setMonth(monthNumber - 1);
  return curDate.toLocaleString("en-US", { month: "short" });
};

// Get Month Start And End Date Based On Month & Year
export const getStartEndDate = (month, year) => {
  const currentMonthDate = "1-" + monthName(month) + "-" + year;
  const date = new Date(currentMonthDate);
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return { firstDay, lastDay };
};

// Get last 3 months names from current date
export const getLast3Months = () => {
  const today = new Date();
  let last3Months = [];

  for (let i = 1; i <= 3; i++) {
    last3Months.push(monthsList[today.getMonth() - i].name);
  }

  return last3Months.reverse();
};

// Convert Values Into Currency Format
export const numberFormat = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);

// User Email Field Validation
export const emailValidation = (email) => {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!email || regex.test(email) === false) {
    return i18n.t("enterValidEmail");
  }
  return "";
};

// Validation Field For Password Creation
const uppercaseRegExp = /(?=.*?[A-Z])/;
const lowercaseRegExp = /(?=.*?[a-z])/;
const digitsRegExp = /(?=.*?[0-9])/;
const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
const minLengthRegExp = /.{8,}/;

export const passwordRequirements = (inputValue) => {
  const minLengthPassword = minLengthRegExp.test(inputValue);
  const uppercasePassword = uppercaseRegExp.test(inputValue);
  const lowercasePassword = lowercaseRegExp.test(inputValue);
  const specialCharPassword = specialCharRegExp.test(inputValue);
  const digitsPassword = digitsRegExp.test(inputValue);

  if (!minLengthPassword) return i18n.t("passwordMinCharacters");
  if (!uppercasePassword) return i18n.t("passwordUppercase");
  if (!lowercasePassword) return i18n.t("passwordLowercase");
  if (!specialCharPassword) return i18n.t("passwordSpecialCharacters");
  if (!digitsPassword) return i18n.t("passwordOneDigit");
};

// Allow Integer Number Only In Textbox
export const isAllowIntegerNumber = (number) => {
  const regNumber = /^[0-9\b]+$/;
  if (number !== "" && number !== 0 && regNumber.test(number)) {
    return "";
  } else {
    return i18n.t("enterValidNumber");
  }
};

// Allow Decimal Number Only In Textbox
export const isAllowDecimalNumber = (number, isMandatory = true) => {
  const regDecimalNumber = /^[+-]?\d*(?:[.,]\d*)?$/;
  if (
    number !== "" &&
    number !== 0 &&
    isMandatory &&
    regDecimalNumber.test(number)
  ) {
    return "";
  } else if (number !== "" && !isMandatory && regDecimalNumber.test(number)) {
    return "";
  } else {
    return i18n.t("enterValidNumber");
  }
};

// Reset Input Field When Focus
export const resetInput = (e) => {
  return (e.target.value =
    e.target.value > 0
      ? e.target.value
      : isNaN(e.target.value)
      ? e.target.value
      : "");
};

// Reset Default Value When OnBlur Input Field
export const resetDefaultValue = (e) => {
  return (e.target.value =
    e.target.value === 0 || e.target.value === "" ? 0 : e.target.value);
};

// Daily Expense Type
export const expenseParticularType = [
  { value: "default", name: "Default" },
  { value: "custom", name: "Custom" },
];

// Expense Payment Type
export const expensePaymentType = [
  { value: "cash", name: "Cash" },
  { value: "netbanking", name: "Net Banking" },
  { value: "creditcard", name: "Credit Card" },
  { value: "debitcard", name: "Debit Card" },
  { value: "upi", name: "UPI Pay" },
];

// Grocery Item Type
export const quantityType = [
  { value: "gms", name: "Grams" },
  { value: "kgms", name: "Kgms" },
  { value: "mltr", name: "M. Litere" },
  { value: "ltr", name: "Litere" },
  { value: "box", name: "Box" },
];

// Extra Income Credit Type
export const extraIncomeType = [
  { value: "cash", name: "Cash" },
  { value: "bank", name: "Bank" },
  { value: "gPay", name: "G-Pay" },
  { value: "upi", name: "UPI Pay" },
];

// Reports Type
export const reportsType = [
  { value: "this-month", name: "This Month" },
  { value: "last-month", name: "Last Month" },
  { value: "last-3-month", name: "Last 3 Months" },
  { value: "last-6-month", name: "Last 6 Months" },
  { value: "this-year", name: "This Year" },
  { value: "last-year", name: "Last Year" },
  { value: "custom-year", name: "Custom Year" },
  { value: "custom-range", name: "Custom Range" },
];

// Edit & Delete Element For Table Row
const onEditChanged = (data) => {
  console.log("Table Edit", data);
};

const onDeleteChanged = (data) => {
  console.log("Table Delete", data);
};

export const tableRowAction = (cell, row, rowIndex, formatExtraData) => {
  return (
    <div className="budget-app-listview-section__action-group">
      <Button
        className="budget-app-listview-section__edit-btn"
        onClick={() => {
          onEditChanged(row);
        }}
      ></Button>
      <Button
        className="budget-app-listview-section__delete-btn"
        onClick={() => {
          onDeleteChanged(row);
        }}
      ></Button>
    </div>
  );
};
