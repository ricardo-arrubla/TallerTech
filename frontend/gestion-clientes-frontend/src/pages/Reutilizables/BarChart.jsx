import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "../Estilos/BarChart.css";

const BarChart = ({ title, data }) => {
  return (
    <div className="bar-chart">
      <h3>{title}</h3>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
