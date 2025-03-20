import React, { useState, useEffect } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
} from "chart.js";
import "./Estilos/Reports.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, ArcElement, PointElement);

const Reports = () => {
  // 📊 Estados para los reportes
  const [dataServicios, setDataServicios] = useState(null);
  const [dataIngresos, setDataIngresos] = useState(null);
  const [dataOcupacion, setDataOcupacion] = useState(null);
  const [notas, setNotas] = useState("");
  const [rangoFechas, setRangoFechas] = useState({ inicio: "", fin: "" });

  useEffect(() => {
    // Simulación de carga de datos desde localStorage o API
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

      setDataOcupacion({
        labels: ["Enero", "Febrero", "Marzo", "Abril"],
        datasets: [
          {
            label: "Ocupación del Taller (%)",
            data: [75, 80, 85, 90], // Porcentaje de ocupación en cada mes
            borderColor: "#ff6384",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            fill: true,
          },
        ],
      });
    }, 1000);
  }, []);

  // Manejar notas del taller
  const handleNotaChange = (e) => {
    setNotas(e.target.value);
  };

  // Manejar rango de fechas para reportes
  const handleFechaChange = (e) => {
    setRangoFechas({ ...rangoFechas, [e.target.name]: e.target.value });
  };

  return (
    <div className="reports-container">
      <h2>📊 Reportes de TallerTech</h2>

      {/* 🔍 Filtro de fechas */}
      <div className="filtro-fechas">
        <label>📅 Desde:</label>
        <input type="date" name="inicio" value={rangoFechas.inicio} onChange={handleFechaChange} />
        <label>📅 Hasta:</label>
        <input type="date" name="fin" value={rangoFechas.fin} onChange={handleFechaChange} />
      </div>

      <div className="charts">
        {/* 🔧 Reporte de Servicios */}
        <div className="chart">
          <h3>🔧 Servicios Realizados</h3>
          {dataServicios ? <Bar data={dataServicios} /> : <p>Cargando datos...</p>}
        </div>

        {/* 💰 Reporte de Ingresos */}
        <div className="chart">
          <h3>💰 Ingresos Mensuales</h3>
          {dataIngresos ? <Pie data={dataIngresos} /> : <p>Cargando datos...</p>}
        </div>

        {/* 📈 Productividad del Taller */}
        <div className="chart">
          <h3>📈 Ocupación del Taller</h3>
          {dataOcupacion ? <Line data={dataOcupacion} /> : <p>Cargando datos...</p>}
        </div>
      </div>

      {/* 📝 Notas del Taller */}
      <div className="notas-container">
        <h3>📝 Notas del Taller</h3>
        <textarea
          value={notas}
          onChange={handleNotaChange}
          placeholder="Escribe aquí cualquier observación o comentario sobre el rendimiento del taller..."
        ></textarea>
      </div>
    </div>
  );
};

export default Reports;
