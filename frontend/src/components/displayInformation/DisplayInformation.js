import React from "react";
import "./display-info.scss";

const DisplayInformation = ({
  customClasses = "",
  displayLabel = "",
  displayNameClasses = "",
  displayName = "",
  displayInfoClasses = "",
  displayInfo = "",
  displayInfoFormat = "number",
}) => {
  return (
    <div className={`budget-app__display-information ${customClasses}`}>
      <label
        htmlFor={displayLabel}
        className={`form-label ${displayNameClasses}`}
      >
        {displayName}
      </label>
      <span className={`${displayInfoClasses}`}>{displayInfo}</span>
    </div>
  );
};

export default DisplayInformation;
