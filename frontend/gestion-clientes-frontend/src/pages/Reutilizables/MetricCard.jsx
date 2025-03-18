import React from "react";
import "../Estilos/MetricCard.css";

const MetricCard = ({ icon, label, value }) => {
  return (
    <div className="metric-card">
      <span className="metric-icon">{icon}</span>
      <p className="metric-label">{label}</p>
      <p className="metric-value">{value}</p>
    </div>
  );
};

export default MetricCard;
