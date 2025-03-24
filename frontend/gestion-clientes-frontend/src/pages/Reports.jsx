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
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Estilos/Reports.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, ArcElement, PointElement);

const Reports = () => {
  // 📊 Estados para los reportes
  const [dataServicios, setDataServicios] = useState(null);
  const [dataIngresos, setDataIngresos] = useState(null);
  const [dataOcupacion, setDataOcupacion] = useState(null);
  const [notas, setNotas] = useState("");
  const [rangoFechas, setRangoFechas] = useState({ inicio: "", fin: "" });

  // Cargar datos persistentes desde localStorage
  useEffect(() => {
    const historialServicios = JSON.parse(localStorage.getItem("historialServicios")) || [];
    const facturas = JSON.parse(localStorage.getItem("facturas")) || [];

    // Filtrar datos por rango de fechas
    const filtrarDatosPorFechas = (datos) => {
      if (!rangoFechas.inicio || !rangoFechas.fin) return datos;

      return datos.filter(
        (d) =>
          new Date(d.fecha) >= new Date(rangoFechas.inicio) &&
          new Date(d.fecha) <= new Date(rangoFechas.fin)
      );
    };

    // Procesar servicios
    const serviciosFiltrados = filtrarDatosPorFechas(historialServicios);
    const serviciosAgrupados = serviciosFiltrados.reduce((acc, servicio) => {
      acc[servicio.tipo] = (acc[servicio.tipo] || 0) + 1;
      return acc;
    }, {});

    setDataServicios({
      labels: Object.keys(serviciosAgrupados),
      datasets: [
        {
          label: "Servicios Realizados",
          data: Object.values(serviciosAgrupados),
          backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff"],
        },
      ],
    });

    // Procesar ingresos
    const ingresosFiltrados = filtrarDatosPorFechas(facturas);
    const ingresosAgrupados = ingresosFiltrados.reduce((acc, factura) => {
      const mes = new Date(factura.fecha).toLocaleString("default", { month: "long" });
      acc[mes] = (acc[mes] || 0) + factura.monto;
      return acc;
    }, {});

    setDataIngresos({
      labels: Object.keys(ingresosAgrupados),
      datasets: [
        {
          label: "Ingresos Generados ($)",
          data: Object.values(ingresosAgrupados),
          backgroundColor: ["#4caf50", "#ff9800", "#f44336", "#2196f3"],
        },
      ],
    });

    // Cargar notas guardadas
    const notasGuardadas = localStorage.getItem("notasTaller");
    if (notasGuardadas) setNotas(notasGuardadas);
  }, [rangoFechas]);

  // Guardar notas en localStorage
  useEffect(() => {
    localStorage.setItem("notasTaller", notas);
  }, [notas]);

  // Manejar cambio de notas
  const handleNotaChange = (e) => {
    setNotas(e.target.value);
  };

  // Manejar cambio de rango de fechas
  const handleFechaChange = (e) => {
    setRangoFechas({ ...rangoFechas, [e.target.name]: e.target.value });
  };

  // Exportar reporte como PDF
  const exportarReportePDF = () => {
    const input = document.querySelector(".reports-container");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("reporte-tallertech.pdf");
    });
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

      {/* Botón para exportar reporte */}
      <button onClick={exportarReportePDF} className="export-button">
        📄 Exportar Reporte
      </button>

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