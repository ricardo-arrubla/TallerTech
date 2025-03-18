import React from "react";
import "../Estilos/ActivityLog.css";

const ActivityLog = ({ activities }) => {
  return (
    <div className="activity-log">
      <h3>🕒 Actividades Recientes</h3>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;
