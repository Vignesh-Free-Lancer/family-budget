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

const baseyear = 2015;
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
  new Date().getFullYear() - 66,
  getYear(new Date(new Date().setFullYear(new Date().getFullYear() - 17)))
);

// Restrict DOB Min 18 Years & Max 75 Years
export const minAge = new Date().setFullYear(new Date().getFullYear() - 18);
export const maxAge = new Date().setFullYear(new Date().getFullYear() - 66);

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
    return "Please enter valid number";
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
    return "Please enter valid number";
  }
};

// Daily Expense Type
export const expenseParticularType = [
  { value: "default", name: "Default" },
  { value: "custom", name: "Custom" },
];

// Expense Payment Type
export const paymentType = [
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

/********** Unused function remove finally *************/

export const dashboardTableData = [
  {
    _id: 1,
    month: "January",
    totalCredit: "183462",
    totalDebit: "32640",
    netAmount: "150822",
  },
  {
    _id: 2,
    month: "Feburary",
    totalCredit: "183462",
    totalDebit: "8210",
    netAmount: "175252",
  },
  {
    _id: 3,
    month: "March",
    totalCredit: "183462",
    totalDebit: "46250",
    netAmount: "137212",
  },
];

export const salaryListTableData = [
  {
    _id: "1",
    userId: "6293ac6607d853cffdefd577",
    month: 1,
    year: 2022,
    monthlySalary: 76979,
    bonus: 300000,
    otherAllowance: 0,
    totalCredit: 376979,
    pf: 3009,
    incomeTax: 30505,
    professionalTax: 200,
    otherDeductions: 1220,
    totalDebit: 34934,
    netPayAmount: 342045,
    isSalaryActive: true,
    createdAt: "2022-05-29T17:27:46.855Z",
    updatedAt: "2022-05-29T17:28:20.269Z",
    __v: 0,
  },
  {
    _id: "2",
    userId: "6293ac6607d853cffdefd577",
    month: 2,
    year: 2022,
    monthlySalary: 76979,
    bonus: 300000,
    otherAllowance: 0,
    totalCredit: 376979,
    pf: 3009,
    incomeTax: 30505,
    professionalTax: 200,
    otherDeductions: 1220,
    totalDebit: 34934,
    netPayAmount: 342045,
    isSalaryActive: true,
    createdAt: "2022-05-29T17:27:46.855Z",
    updatedAt: "2022-05-29T17:28:20.269Z",
    __v: 0,
  },
  {
    _id: "3",
    userId: "6293ac6607d853cffdefd577",
    month: 3,
    year: 2022,
    monthlySalary: 76979,
    bonus: 300000,
    otherAllowance: 0,
    totalCredit: 376979,
    pf: 3009,
    incomeTax: 30505,
    professionalTax: 200,
    otherDeductions: 1220,
    totalDebit: 34934,
    netPayAmount: 342045,
    isSalaryActive: true,
    createdAt: "2022-05-29T17:27:46.855Z",
    updatedAt: "2022-05-29T17:28:20.269Z",
    __v: 0,
  },
  {
    _id: "4",
    userId: "6293ac6607d853cffdefd577",
    month: 4,
    year: 2022,
    monthlySalary: 76979,
    bonus: 300000,
    otherAllowance: 0,
    totalCredit: 376979,
    pf: 3009,
    incomeTax: 30505,
    professionalTax: 200,
    otherDeductions: 1220,
    totalDebit: 34934,
    netPayAmount: 342045,
    isSalaryActive: true,
    createdAt: "2022-05-29T17:27:46.855Z",
    updatedAt: "2022-05-29T17:28:20.269Z",
    __v: 0,
  },
  {
    _id: "5",
    userId: "6293ac6607d853cffdefd577",
    month: 5,
    year: 2022,
    monthlySalary: 76979,
    bonus: 300000,
    otherAllowance: 0,
    totalCredit: 376979,
    pf: 3009,
    incomeTax: 30505,
    professionalTax: 200,
    otherDeductions: 1220,
    totalDebit: 34934,
    netPayAmount: 342045,
    isSalaryActive: true,
    createdAt: "2022-05-29T17:27:46.855Z",
    updatedAt: "2022-05-29T17:28:20.269Z",
    __v: 0,
  },
  {
    _id: "6",
    userId: "6293ac6607d853cffdefd577",
    month: 6,
    year: 2022,
    monthlySalary: 76979,
    bonus: 300000,
    otherAllowance: 0,
    totalCredit: 376979,
    pf: 3009,
    incomeTax: 30505,
    professionalTax: 200,
    otherDeductions: 1220,
    totalDebit: 34934,
    netPayAmount: 342045,
    isSalaryActive: true,
    createdAt: "2022-05-29T17:27:46.855Z",
    updatedAt: "2022-05-29T17:28:20.269Z",
    __v: 0,
  },
  {
    _id: "7",
    userId: "6293ac6607d853cffdefd577",
    month: 7,
    year: 2022,
    monthlySalary: 76979,
    bonus: 300000,
    otherAllowance: 0,
    totalCredit: 376979,
    pf: 3009,
    incomeTax: 30505,
    professionalTax: 200,
    otherDeductions: 1220,
    totalDebit: 34934,
    netPayAmount: 342045,
    isSalaryActive: true,
    createdAt: "2022-05-29T17:27:46.855Z",
    updatedAt: "2022-05-29T17:28:20.269Z",
    __v: 0,
  },
  {
    _id: "8",
    userId: "6293ac6607d853cffdefd577",
    month: 8,
    year: 2022,
    monthlySalary: 76979,
    bonus: 300000,
    otherAllowance: 0,
    totalCredit: 376979,
    pf: 3009,
    incomeTax: 30505,
    professionalTax: 200,
    otherDeductions: 1220,
    totalDebit: 34934,
    netPayAmount: 342045,
    isSalaryActive: true,
    createdAt: "2022-05-29T17:27:46.855Z",
    updatedAt: "2022-05-29T17:28:20.269Z",
    __v: 0,
  },
  {
    _id: "9",
    userId: "6293ac6607d853cffdefd577",
    month: 9,
    year: 2022,
    monthlySalary: 76979,
    bonus: 300000,
    otherAllowance: 0,
    totalCredit: 376979,
    pf: 3009,
    incomeTax: 30505,
    professionalTax: 200,
    otherDeductions: 1220,
    totalDebit: 34934,
    netPayAmount: 342045,
    isSalaryActive: true,
    createdAt: "2022-05-29T17:27:46.855Z",
    updatedAt: "2022-05-29T17:28:20.269Z",
    __v: 0,
  },
  {
    _id: "10",
    userId: "6293ac6607d853cffdefd577",
    month: 10,
    year: 2022,
    monthlySalary: 76979,
    bonus: 300000,
    otherAllowance: 0,
    totalCredit: 376979,
    pf: 3009,
    incomeTax: 30505,
    professionalTax: 200,
    otherDeductions: 1220,
    totalDebit: 34934,
    netPayAmount: 342045,
    isSalaryActive: true,
    createdAt: "2022-05-29T17:27:46.855Z",
    updatedAt: "2022-05-29T17:28:20.269Z",
    __v: 0,
  },
  {
    _id: "11",
    userId: "6293ac6607d853cffdefd577",
    month: 11,
    year: 2022,
    monthlySalary: 76979,
    bonus: 300000,
    otherAllowance: 0,
    totalCredit: 376979,
    pf: 3009,
    incomeTax: 30505,
    professionalTax: 200,
    otherDeductions: 1220,
    totalDebit: 34934,
    netPayAmount: 342045,
    isSalaryActive: true,
    createdAt: "2022-05-29T17:27:46.855Z",
    updatedAt: "2022-05-29T17:28:20.269Z",
    __v: 0,
  },
  {
    _id: "12",
    userId: "6293ac6607d853cffdefd577",
    month: 12,
    year: 2022,
    monthlySalary: 76979,
    bonus: 300000,
    otherAllowance: 0,
    totalCredit: 376979,
    pf: 3009,
    incomeTax: 30505,
    professionalTax: 200,
    otherDeductions: 1220,
    totalDebit: 34934,
    netPayAmount: 342045,
    isSalaryActive: true,
    createdAt: "2022-05-29T17:27:46.855Z",
    updatedAt: "2022-05-29T17:28:20.269Z",
    __v: 0,
  },
];

export const extraIncomeData = [
  {
    _id: "1",
    userId: "6293ac6607d853cffdefd577",
    incomeDate: "2022-05-29T17:27:46.855Z",
    extraIncomeType: "Bank",
    creditAmount: 8000,
    description: "Last month salary balance amount",
    createdAt: "2022-05-29T17:27:46.855Z",
    updatedAt: "2022-05-29T17:28:20.269Z",
    __v: 0,
  },
  {
    _id: "2",
    userId: "6293ac6607d853cffdefd577",
    incomeDate: "2022-05-29T17:27:46.855Z",
    extraIncomeType: "bank",
    creditAmount: 8000,
    description: "Last month salary balance amount",
    createdAt: "2022-05-29T17:27:46.855Z",
    updatedAt: "2022-05-29T17:28:20.269Z",
    __v: 0,
  },
  {
    _id: "3",
    userId: "6293ac6607d853cffdefd577",
    incomeDate: "2022-05-29T17:27:46.855Z",
    extraIncomeType: "bank",
    creditAmount: 8000,
    description: "Last month salary balance amount",
    createdAt: "2022-05-29T17:27:46.855Z",
    updatedAt: "2022-05-29T17:28:20.269Z",
    __v: 0,
  },
  {
    _id: "4",
    userId: "6293ac6607d853cffdefd577",
    incomeDate: "2022-05-29T17:27:46.855Z",
    extraIncomeType: "bank",
    creditAmount: 8000,
    description: "Last month salary balance amount",
    createdAt: "2022-05-29T17:27:46.855Z",
    updatedAt: "2022-05-29T17:28:20.269Z",
    __v: 0,
  },
  {
    _id: "5",
    userId: "6293ac6607d853cffdefd577",
    incomeDate: "2022-05-29T17:27:46.855Z",
    extraIncomeType: "bank",
    creditAmount: 8000,
    description: "Last month salary balance amount",
    createdAt: "2022-05-29T17:27:46.855Z",
    updatedAt: "2022-05-29T17:28:20.269Z",
    __v: 0,
  },
  {
    _id: "6",
    userId: "6293ac6607d853cffdefd577",
    incomeDate: "2022-05-29T17:27:46.855Z",
    extraIncomeType: "bank",
    creditAmount: 8000,
    description: "Last month salary balance amount",
    createdAt: "2022-05-29T17:27:46.855Z",
    updatedAt: "2022-05-29T17:28:20.269Z",
    __v: 0,
  },
  {
    _id: "7",
    userId: "6293ac6607d853cffdefd577",
    incomeDate: "2022-05-29T17:27:46.855Z",
    extraIncomeType: "bank",
    creditAmount: 8000,
    description: "Last month salary balance amount",
    createdAt: "2022-05-29T17:27:46.855Z",
    updatedAt: "2022-05-29T17:28:20.269Z",
    __v: 0,
  },
  {
    _id: "8",
    userId: "6293ac6607d853cffdefd577",
    incomeDate: "2022-05-29T17:27:46.855Z",
    extraIncomeType: "bank",
    creditAmount: 8000,
    description: "Last month salary balance amount",
    createdAt: "2022-05-29T17:27:46.855Z",
    updatedAt: "2022-05-29T17:28:20.269Z",
    __v: 0,
  },
  {
    _id: "9",
    userId: "6293ac6607d853cffdefd577",
    incomeDate: "2022-05-29T17:27:46.855Z",
    extraIncomeType: "bank",
    creditAmount: 8000,
    description: "Last month salary balance amount",
    createdAt: "2022-05-29T17:27:46.855Z",
    updatedAt: "2022-05-29T17:28:20.269Z",
    __v: 0,
  },
  {
    _id: "10",
    userId: "6293ac6607d853cffdefd577",
    incomeDate: "2022-05-29T17:27:46.855Z",
    extraIncomeType: "bank",
    creditAmount: 8000,
    description: "Last month salary balance amount",
    createdAt: "2022-05-29T17:27:46.855Z",
    updatedAt: "2022-05-29T17:28:20.269Z",
    __v: 0,
  },
  {
    _id: "11",
    userId: "6293ac6607d853cffdefd577",
    incomeDate: "2022-05-29T17:27:46.855Z",
    extraIncomeType: "bank",
    creditAmount: 8000,
    description: "Last month salary balance amount",
    createdAt: "2022-05-29T17:27:46.855Z",
    updatedAt: "2022-05-29T17:28:20.269Z",
    __v: 0,
  },
  {
    _id: "12",
    userId: "6293ac6607d853cffdefd577",
    incomeDate: "2022-05-29T17:27:46.855Z",
    extraIncomeType: "bank",
    creditAmount: 8000,
    description: "Last month salary balance amount",
    createdAt: "2022-05-29T17:27:46.855Z",
    updatedAt: "2022-05-29T17:28:20.269Z",
    __v: 0,
  },
];

export const userDataList = [
  {
    _id: "6293ac6607d853cffdefd577",
    userName: "Vignesh",
    email: "developer.vicki@gmail.com",
    gender: "Male",
    dob: "1990-04-24T18:30:00.000Z",
    isAdmin: true,
    pic: "http://res.cloudinary.com/silentkiller/image/upload/v1653845088/dnmzelzq09u36ts41pjs.png",
    emailToken: null,
    isEmailVerified: true,
    isActive: true,
    createdAt: "2022-05-29T17:24:54.182Z",
    updatedAt: "2022-05-29T17:25:09.525Z",
    __v: 0,
  },
  {
    _id: "62948c5ef1b9a3a46f948909",
    userName: "Vino",
    email: "vinodhininatarajan@gmail.com",
    gender: "Female",
    dob: "1987-08-17T18:30:00.000Z",
    isAdmin: false,
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    emailToken: null,
    isEmailVerified: true,
    isActive: true,
    createdAt: "2022-05-30T09:20:30.857Z",
    updatedAt: "2022-05-30T09:23:24.744Z",
    __v: 0,
  },
  {
    _id: "6294d2d0acf1227b3aea0986",
    userName: "Syed",
    email: "sh99@yahoo.com",
    gender: "Male",
    dob: "1988-08-13T18:30:00.000Z",
    isAdmin: false,
    pic: "http://res.cloudinary.com/silentkiller/image/upload/v1653920277/doxjz0pibholafwdaxhd.jpg",
    emailToken: null,
    isEmailVerified: true,
    isActive: true,
    createdAt: "2022-05-30T14:21:04.460Z",
    updatedAt: "2022-05-30T14:21:42.479Z",
    __v: 0,
  },
  {
    _id: "6297aa2f8a6b0f50f1b24fa0",
    userName: "Parthigp",
    email: "parthibang47@gmail.com",
    gender: "Male",
    dob: "1990-05-08T18:30:00.000Z",
    isAdmin: false,
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    emailToken: null,
    isEmailVerified: true,
    isActive: true,
    createdAt: "2022-06-01T18:04:31.401Z",
    updatedAt: "2022-06-01T18:05:12.371Z",
    __v: 0,
  },
  {
    _id: "62c3c45f0948cdf9e1845778",
    userName: "subitha",
    email: "subithadossv3013@gmail.com",
    gender: "Female",
    dob: "1992-12-29T18:30:00.000Z",
    isAdmin: false,
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    emailToken: null,
    isEmailVerified: true,
    isActive: true,
    createdAt: "2022-07-05T04:55:59.393Z",
    updatedAt: "2022-07-05T04:57:00.913Z",
    __v: 0,
  },
];

/********** Unused function remove finally *************/
