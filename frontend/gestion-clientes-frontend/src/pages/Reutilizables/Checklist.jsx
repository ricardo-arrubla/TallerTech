import React from "react";
import "../Estilos/Checklist.css";

const Checklist = ({ items, onChange }) => {
  return (
    <div className="checklist">
      {items.map((item, index) => (
        <label key={index}>
          <input type="checkbox" onChange={() => onChange(item)} />
          {item}
        </label>
      ))}
    </div>
  );
};

export default Checklist;
