import React from "react";
import DatePicker from "react-datepicker";

const CustomDatePicker = ({ dtVal, handleChange }) => {
  return (
    <>
      <DatePicker
        onChange={handleChange}
        value={dtVal}
        clearIcon={null}
        format="dd/MM/yyyy"
        className="mr-2"
      />
    </>
  );
};

export default CustomDatePicker;
