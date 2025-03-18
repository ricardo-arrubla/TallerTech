import React from "react";
import { Link } from "react-router-dom";
import "../Estilos/QuickActions.css";

const QuickActions = ({ actions }) => {
  return (
    <div className="quick-actions">
      {actions.map((action, index) => (
        <Link key={index} to={action.path} className="quick-action-btn">
          {action.icon} {action.label}
        </Link>
      ))}
    </div>
  );
};

export default QuickActions;
