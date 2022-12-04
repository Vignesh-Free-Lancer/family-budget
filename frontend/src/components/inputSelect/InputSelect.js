import React from "react";
import { useTranslation } from "react-i18next";

const InputSelect = ({
  inputName,
  inputCustomClass = "",
  inputDefaultValue = "select",
  inputArray = [],
  inputChange = () => {},
  inputErrorMessage,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <select
        name={inputName}
        className={`form-control ${inputCustomClass} ${
          inputErrorMessage ? "is-invalid" : ""
        }`}
        value={inputDefaultValue}
        onChange={inputChange}
      >
        <option value="select">{t("pleaseSelect")}...</option>
        {inputArray.map((input, key) => {
          return (
            <option key={key} value={input.value}>
              {t(input.name)}
            </option>
          );
        })}
      </select>
      {inputErrorMessage && (
        <div className="invalid-feedback">{inputErrorMessage}</div>
      )}
    </>
  );
};

export default InputSelect;
