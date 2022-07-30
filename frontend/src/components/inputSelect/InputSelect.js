import React from "react";

const InputSelect = ({
  inputName,
  inputCustomClass = "",
  inputDefaultValue = "select",
  inputArray = [],
  inputChange = () => {},
  inputErrorMessage,
}) => {
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
        <option value="select">Please select...</option>
        {inputArray.map((input, key) => {
          return (
            <option key={key} value={input.value}>
              {input.name}
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
