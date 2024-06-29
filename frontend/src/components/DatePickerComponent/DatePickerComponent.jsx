import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerStyles.css";

const DatePickerComponent = ({ selectedDate, onDateChange }) => {

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => onDateChange(date)}
        dateFormat="dd/MM/yyyy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        className="custom-datepicker"
        placeholderText="Select Due Date"
      />
    </div>
  );
};

export default DatePickerComponent;