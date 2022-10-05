import {
  emailValidation,
  passwordRequirements,
  isAllowDecimalNumber,
} from "../utils/Utils";
import i18n from "../i18n/i18n";

export const userFieldOnSubmitValidation = (
  formType,
  userData = {},
  userDob = ""
) => {
  const errors = {};

  if (formType === "registration") {
    if (userData.username.trim() === "")
      errors.username = i18n.t("pleaseEnterUsername");

    if (userData.email.trim() === "") errors.email = i18n.t("pleaseEnterEmail");

    if (!userData._id) {
      if (userData.password.trim() === "" && !userData._id)
        errors.password = i18n.t("pleaseEnterPassword");

      if (userData.confirmPassword.trim() === "")
        errors.confirmPassword = i18n.t("PleaseEnterConfirmPassword");

      if (
        userData.password.trim() !== "" &&
        userData.password.trim() !== userData.confirmPassword.trim()
      )
        errors.confirmPassword = i18n.t("passwordNotMatch");
    }

    if (userData.gender === "") errors.gender = i18n.t("pleaseSelectGender");

    if (userDob === "" || userDob === null)
      errors.dob = i18n.t("pleaseSelectDob");
  } else if (formType === "login") {
    if (userData.email.trim() === "") errors.email = i18n.t("pleaseEnterEmail");

    if (userData.password.trim() === "")
      errors.password = i18n.t("pleaseEnterPassword");
  } else if (formType === "forgot-password") {
    if (userData.email.trim() === "") errors.email = i18n.t("pleaseEnterEmail");

    if (userData.password.trim() === "")
      errors.password = i18n.t("pleaseEnterPassword");

    if (userData.confirmPassword.trim() === "")
      errors.confirmPassword = i18n.t("PleaseEnterConfirmPassword");

    if (
      userData.password.trim() !== "" &&
      userData.password.trim() !== userData.confirmPassword.trim()
    )
      errors.confirmPassword = i18n.t("passwordNotMatch");
  } else if (formType === "reset-password") {
    if (userData.oldPassword.trim() === "")
      errors.oldPassword = i18n.t("enterOldPassword");

    if (userData.newPassword.trim() === "")
      errors.newPassword = i18n.t("enterNewPassword");

    if (userData.confirmNewPassword.trim() === "")
      errors.confirmNewPassword = i18n.t("PleaseEnterConfirmPassword");

    if (
      userData.oldPassword.trim() !== "" &&
      userData.newPassword.trim() !== "" &&
      userData.oldPassword.trim() === userData.newPassword.trim()
    )
      errors.newPassword = i18n.t("resetPageContent");

    if (
      userData.newPassword.trim() !== "" &&
      userData.newPassword.trim() !== userData.confirmNewPassword.trim()
    )
      errors.confirmNewPassword = i18n.t("passwordNotMatch");
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

export const userFieldOnChangeValidation = (
  input,
  userData = {},
  loginPage = false
) => {
  if (input.name === "username") {
    if (input.value.trim() === "") return i18n.t("pleaseEnterUsername");
  }

  if (input.name === "email") {
    if (input.value.trim() === "") return i18n.t("pleaseEnterEmail");
    if (input.value.trim() !== "") return emailValidation(input.value);
  }

  if (input.name === "password" && !loginPage) {
    if (input.value.trim() === "") return i18n.t("pleaseEnterPassword");
    return passwordRequirements(input.value.trim());
  }

  if (input.name === "oldPassword") {
    if (input.value.trim() === "") return i18n.t("enterOldPassword");
    return passwordRequirements(input.value.trim());
  }

  if (input.name === "newPassword") {
    if (input.value.trim() === "") return i18n.t("enterNewPassword");

    if (input.value.trim() !== "") {
      if (input.value === userData.oldPassword) {
        return i18n.t("resetPageContent");
      }
      return passwordRequirements(input.value.trim());
    }
  }

  if (input.name === "confirmPassword") {
    if (input.value.trim() === "") return i18n.t("PleaseEnterConfirmPassword");
    if (input.value.trim() !== "" && userData.password !== "") {
      if (input.value !== userData.password) return i18n.t("passwordNotMatch");
    }
  }

  if (input.name === "confirmNewPassword") {
    if (input.value.trim() === "") return i18n.t("PleaseEnterConfirmPassword");
    if (input.value.trim() !== "" && userData.newPassword !== "") {
      if (input.value !== userData.newPassword)
        return i18n.t("passwordNotMatch");
    }
  }
};

export const rootFieldOnSubmitValidation = (monthName, yearName) => {
  const errors = {};

  if (monthName === "select") errors.selectedMonth = i18n.t("selectMonth");
  if (yearName === "select") errors.selectedYear = i18n.t("selectYear");

  return Object.keys(errors).length === 0 ? null : errors;
};

export const salaryFieldOnChangeValidation = (input, salaryData = {}) => {
  let stateSalary =
    parseFloat(salaryData.monthlySalary) > 0
      ? parseFloat(salaryData.monthlySalary)
      : 0;

  let stateBonus =
    parseFloat(salaryData.bonusAmount) > 0
      ? isNaN(salaryData.bonusAmount)
        ? 0
        : parseFloat(salaryData.bonusAmount)
      : 0;

  let stateAllowance =
    parseFloat(salaryData.otherAllowance) > 0
      ? isNaN(salaryData.otherAllowance)
        ? 0
        : parseFloat(salaryData.otherAllowance)
      : 0;

  let statePF =
    parseFloat(salaryData.pf) > 0
      ? isNaN(salaryData.pf)
        ? 0
        : parseFloat(salaryData.pf)
      : 0;

  let stateIncomeTax =
    parseFloat(salaryData.incomeTax) > 0
      ? isNaN(salaryData.incomeTax)
        ? 0
        : parseFloat(salaryData.incomeTax)
      : 0;

  let stateProfessionalTax =
    parseFloat(salaryData.professionalTax) > 0
      ? isNaN(salaryData.professionalTax)
        ? 0
        : parseFloat(salaryData.professionalTax)
      : 0;

  let stateOtherDeduction =
    parseFloat(salaryData.otherDeductions) > 0
      ? isNaN(salaryData.otherDeductions)
        ? 0
        : parseFloat(salaryData.otherDeductions)
      : 0;

  if (input.name === "monthlySalary") {
    if (parseFloat(input.value) === 0 || input.value === "") {
      salaryData.totalCR = parseFloat(stateBonus) + parseFloat(stateAllowance);

      return i18n.t("enterMonthlySalary");
    } else {
      salaryData.totalCR = isNaN(
        input.value + parseFloat(stateBonus) + parseFloat(stateAllowance)
      )
        ? parseFloat(0) + parseFloat(stateBonus) + parseFloat(stateAllowance)
        : parseFloat(input.value) +
          parseFloat(stateBonus) +
          parseFloat(stateAllowance);

      return isAllowDecimalNumber(input.value);
    }
  }

  if (input.name === "bonusAmount") {
    if (parseFloat(input.value) === 0 || input.value === "") {
      salaryData.totalCR = parseFloat(stateSalary) + parseFloat(stateAllowance);
    } else {
      salaryData.totalCR = isNaN(
        input.value + parseFloat(stateSalary) + parseFloat(stateAllowance)
      )
        ? parseFloat(0) + parseFloat(stateSalary) + parseFloat(stateAllowance)
        : parseFloat(input.value) +
          parseFloat(stateSalary) +
          parseFloat(stateAllowance);

      return isAllowDecimalNumber(input.value);
    }
  }

  if (input.name === "otherAllowance") {
    if (parseFloat(input.value) === 0 || input.value === "") {
      salaryData.totalCR = parseFloat(stateSalary) + parseFloat(stateBonus);
    } else {
      salaryData.totalCR = isNaN(
        input.value + parseFloat(stateSalary) + parseFloat(stateBonus)
      )
        ? parseFloat(0) + parseFloat(stateSalary) + parseFloat(stateBonus)
        : parseFloat(input.value) +
          parseFloat(stateSalary) +
          parseFloat(stateBonus);

      return isAllowDecimalNumber(input.value);
    }
  }

  if (input.name === "pf") {
    if (parseFloat(input.value) === 0 || input.value === "") {
      salaryData.totalDR =
        parseFloat(stateIncomeTax) +
        parseFloat(stateProfessionalTax) +
        parseFloat(stateOtherDeduction);
    } else {
      salaryData.totalDR = isNaN(
        input.value +
          parseFloat(stateIncomeTax) +
          parseFloat(stateProfessionalTax) +
          parseFloat(stateOtherDeduction)
      )
        ? parseFloat(0) +
          parseFloat(stateIncomeTax) +
          parseFloat(stateProfessionalTax) +
          parseFloat(stateOtherDeduction)
        : parseFloat(input.value) +
          parseFloat(stateIncomeTax) +
          parseFloat(stateProfessionalTax) +
          parseFloat(stateOtherDeduction);

      return isAllowDecimalNumber(input.value);
    }
  }

  if (input.name === "incomeTax") {
    if (parseFloat(input.value) === 0 || input.value === "") {
      salaryData.totalDR =
        parseFloat(statePF) +
        parseFloat(stateProfessionalTax) +
        parseFloat(stateOtherDeduction);
    } else {
      salaryData.totalDR = isNaN(
        input.value +
          parseFloat(statePF) +
          parseFloat(stateProfessionalTax) +
          parseFloat(stateOtherDeduction)
      )
        ? parseFloat(0) +
          parseFloat(statePF) +
          parseFloat(stateProfessionalTax) +
          parseFloat(stateOtherDeduction)
        : parseFloat(input.value) +
          parseFloat(statePF) +
          parseFloat(stateProfessionalTax) +
          parseFloat(stateOtherDeduction);

      return isAllowDecimalNumber(input.value);
    }
  }

  if (input.name === "professionalTax") {
    if (parseFloat(input.value) === 0 || input.value === "") {
      salaryData.totalDR =
        parseFloat(statePF) +
        parseFloat(stateIncomeTax) +
        parseFloat(stateOtherDeduction);
    } else {
      salaryData.totalDR = isNaN(
        input.value +
          parseFloat(statePF) +
          parseFloat(stateIncomeTax) +
          parseFloat(stateOtherDeduction)
      )
        ? parseFloat(0) +
          parseFloat(statePF) +
          parseFloat(stateIncomeTax) +
          parseFloat(stateOtherDeduction)
        : parseFloat(input.value) +
          parseFloat(statePF) +
          parseFloat(stateIncomeTax) +
          parseFloat(stateOtherDeduction);

      return isAllowDecimalNumber(input.value);
    }
  }

  if (input.name === "otherDeductions") {
    if (parseFloat(input.value) === 0 || input.value === "") {
      salaryData.totalDR =
        parseFloat(statePF) +
        parseFloat(stateIncomeTax) +
        parseFloat(stateProfessionalTax);
    } else {
      salaryData.totalDR = isNaN(
        input.value +
          parseFloat(statePF) +
          parseFloat(stateIncomeTax) +
          parseFloat(stateProfessionalTax)
      )
        ? parseFloat(0) +
          parseFloat(statePF) +
          parseFloat(stateIncomeTax) +
          parseFloat(stateProfessionalTax)
        : parseFloat(input.value) +
          parseFloat(statePF) +
          parseFloat(stateIncomeTax) +
          parseFloat(stateProfessionalTax);

      return isAllowDecimalNumber(input.value);
    }
  }
};
