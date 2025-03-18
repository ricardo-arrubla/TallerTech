import React from "react";
import "../Estilos/Textarea.css";

const Textarea = ({ placeholder, value, onChange }) => {
  return (
    <textarea className="textarea" placeholder={placeholder} value={value} onChange={onChange} />
  );
};

export default Textarea;
