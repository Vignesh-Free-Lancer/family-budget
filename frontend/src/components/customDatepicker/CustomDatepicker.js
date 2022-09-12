import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { months, dobYears } from "../../utils/Utils";

const CustomDatepicker = (props) => {
  const {
    customDatepickerClassname = "form-control",
    customdateName,
    customDatePlaceholder,
    customDateValue = "",
    customDateChange,
    customMinDateRange,
    customMaxDateRange,
  } = props;
  const [customDate, setCustomDate] = useState(customDateValue);

  const handleCustomDateChange = (date) => {
    setCustomDate(date);
    customDateChange(date);
  };

  useEffect(() => {
    customDateValue !== "" && setCustomDate(customDateValue);
  }, [customDateValue]);

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
      onChange={handleCustomDateChange}
      name={customdateName}
      dateFormat="dd/MM/yyyy"
      className={customDatepickerClassname}
      placeholderText={customDatePlaceholder}
      maxDate={customMinDateRange}
      minDate={customMaxDateRange}
    />
  );
};

export default CustomDatepicker;
