import React from "react";
import { Link } from "react-router-dom";
import "../Estilos/RegistroCard.css";

const RegistroCard = ({ icon, title, description, path }) => {
  return (
    <Link to={path} className="registro-card">
      <div>
        <i className={icon}></i>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default RegistroCard;
