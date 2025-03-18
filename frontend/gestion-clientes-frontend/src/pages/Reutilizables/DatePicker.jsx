import React from "react";
import "../Estilos/DatePicker.css";

const DatePicker = ({ value, onChange }) => {
  return (
    <input type="date" className="date-picker" value={value} onChange={onChange} />
  );
};

export default DatePicker;
