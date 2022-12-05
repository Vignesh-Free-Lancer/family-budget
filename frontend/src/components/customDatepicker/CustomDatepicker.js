import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { months } from "../../utils/Utils";

const CustomDatepicker = (props) => {
  const {
    customDatepickerClassname = "form-control",
    customdateName,
    customDatePlaceholder,
    customDataYears,
    customDateValue = "",
    customDateChange,
    customMinDateRange,
    customMaxDateRange,
    customDatepickerDisabled = false,
    customDatepickerPrev = true,
    customDatepickerNext = true,
  } = props;

  // State Object For Custom Date To Datepicker
  const [customDate, setCustomDate] = useState(null);

  // Datepicker Change Event
  const handleCustomDateChange = (date) => {
    setCustomDate(date);
    customDateChange(date);
  };

  // Bind The Date Value From Component
  useEffect(() => {
    customDateValue !== "" && setCustomDate(customDateValue);
  }, [customDateValue]);

  return (
    <DatePicker
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {customDatepickerPrev && (
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {"<"}
            </button>
          )}

          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {customDataYears.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
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

          {customDatepickerNext && (
            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {">"}
            </button>
          )}
        </div>
      )}
      selected={customDate}
      onChange={handleCustomDateChange}
      dateFormat="dd/MM/yyyy"
      className={customDatepickerClassname}
      name={customdateName}
      placeholderText={customDatePlaceholder}
      minDate={customMinDateRange ? customMinDateRange : null}
      maxDate={customMaxDateRange ? customMaxDateRange : null}
      disabled={customDatepickerDisabled}
    />
  );
};

export default CustomDatepicker;
