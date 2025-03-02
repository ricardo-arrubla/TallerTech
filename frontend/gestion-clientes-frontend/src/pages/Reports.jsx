import React, { useState, useEffect } from "react"; // 👈 Asegurar que `React` y los hooks se importen correctamente
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import "./Reports.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Reports = () => {
  const [dataServicios, setDataServicios] = useState(null);
  const [dataIngresos, setDataIngresos] = useState(null);

  useEffect(() => {
    // Simulación de carga de datos
    setTimeout(() => {
      setDataServicios({
        labels: ["Frenos", "Motor", "Neumáticos", "Aceite", "Otros"],
        datasets: [
          {
            label: "Servicios Realizados",
            data: [25, 15, 20, 18, 10],
            backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff"],
          },
        ],
      });

      setDataIngresos({
        labels: ["Enero", "Febrero", "Marzo", "Abril"],
        datasets: [
          {
            label: "Ingresos Generados ($)",
            data: [2000, 1800, 2200, 2500],
            backgroundColor: ["#4caf50", "#ff9800", "#f44336", "#2196f3"],
          },
        ],
      });
    }, 1000); // Simulando carga con 1 segundo de espera
  }, []);

  return (
    <div className="reports-container">
      <h2>📊 Reportes de TallerTech</h2>
      <div className="charts">
        <div className="chart">
          <h3>🔧 Servicios Realizados</h3>
          {dataServicios ? <Bar data={dataServicios} /> : <p>Cargando datos...</p>}
        </div>
        <div className="chart">
          <h3>💰 Ingresos Mensuales</h3>
          {dataIngresos ? <Pie data={dataIngresos} /> : <p>Cargando datos...</p>}
        </div>
      </div>
    </div>
  );
};

export default Reports;
