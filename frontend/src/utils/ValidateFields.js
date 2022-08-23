import { emailValidation, passwordRequirements } from "../utils/Utils";
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

    if (userData.password.trim() === "")
      errors.password = i18n.t("pleaseEnterPassword");

    if (userData.confirmPassword.trim() === "")
      errors.confirmPassword = i18n.t("PleaseEnterConfirmPassword");

    if (
      userData.password.trim() !== "" &&
      userData.password.trim() !== userData.confirmPassword.trim()
    )
      errors.confirmPassword = i18n.t("passwordNotMatch");

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
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

export const userFieldOnChangeValidation = (input, userData = {}) => {
  if (input.name === "username") {
    if (input.value.trim() === "") return i18n.t("pleaseEnterUsername");
  }

  if (input.name === "email") {
    if (input.value.trim() === "") return i18n.t("pleaseEnterEmail");
    if (input.value.trim() !== "") return emailValidation(input.value);
  }

  if (input.name === "password") {
    if (input.value.trim() === "") return i18n.t("pleaseEnterPassword");
    return passwordRequirements(input.value.trim());
  }

  if (input.name === "confirmPassword") {
    if (input.value.trim() === "") return i18n.t("PleaseEnterConfirmPassword");
    if (input.value.trim() !== "" && userData.password !== "") {
      if (input.value !== userData.password) return i18n.t("passwordNotMatch");
    }
  }
};
