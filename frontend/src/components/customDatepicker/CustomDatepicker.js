import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { months, dobYears } from "../../utils/Utils";

const CustomDatepicker = (props) => {
  const {
    customDateChange,
    customdateName,
    customDatePlaceholder,
    customMinDateRange,
    customMaxDateRange,
  } = props;
  const [customDate, setCustomDate] = useState("");

  const handleCustomFateChange = (date) => {
    setCustomDate(date);
    customDateChange(date);
  };

  return (
    <DatePicker
      renderCustomHeader={({
        date = new Date(customMinDateRange),
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="custom-date__header">
          <select
            className="custom-date__dropdown"
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {dobYears.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            className="custom-date__dropdown"
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
      selected={customDate}
      onChange={handleCustomFateChange}
      name={customdateName}
      dateFormat="dd/MM/yyyy"
      className={`form-control`}
      placeholderText={customDatePlaceholder}
      maxDate={customMinDateRange}
      minDate={customMaxDateRange}
    />
  );
};

export default CustomDatepicker;
