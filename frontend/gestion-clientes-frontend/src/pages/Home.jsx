import React from "react";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./Home.css";

const Home = () => {
  // Datos simulados para el dashboard
  const metrics = {
    clientes: 50,
    vehiculos: 75,
    serviciosPendientes: 5,
    citasHoy: 3,
    ingresosMes: 5000,
  };

  const actividadesRecientes = [
    "🕒 10:15 AM - Cliente registrado: Juan Pérez",
    "🔧 11:00 AM - Diagnóstico completado: ABC123",
    "📅 12:30 PM - Cita agendada: XYZ456",
  ];

  // Datos para el gráfico de servicios
  const dataServicios = {
    labels: ["Cambio de Aceite", "Alineación", "Revisión General", "Frenos"],
    datasets: [
      {
        label: "Servicios Realizados",
        data: [20, 15, 10, 8],
        backgroundColor: ["#4caf50", "#ffcc00", "#2196F3", "#f44336"],
      },
    ],
  };

  return (
    <div className="home-container">
      {/* Encabezado */}
      <div className="header">
        <img src="/TallerTechLogo3.png" alt="Logo TallerTech" className="logo" />
        <h1>Bienvenido a TallerTech</h1>
        <p>📅 {new Date().toLocaleDateString()}</p>
      </div>

      {/* Sección de métricas */}
      <div className="metricas">
        <div className="card">🚗 <strong>Clientes:</strong> {metrics.clientes}</div>
        <div className="card">🚙 <strong>Vehículos:</strong> {metrics.vehiculos}</div>
        <div className="card">⚙️ <strong>Servicios Pendientes:</strong> {metrics.serviciosPendientes}</div>
        <div className="card">📅 <strong>Citas Hoy:</strong> {metrics.citasHoy}</div>
        <div className="card">💰 <strong>Ingresos Mes:</strong> ${metrics.ingresosMes}</div>
      </div>

      {/* Gráfico de servicios */}
      <div className="grafico-container">
        <h3>📊 Servicios Realizados</h3>
        <Bar data={dataServicios} />
      </div>

      {/* Acciones rápidas */}
      <div className="acciones-rapidas">
        <h3>🚀 Acciones Rápidas</h3>
        <div className="acciones-botones">
          <Link to="/registro-cliente" className="btn">➕ Registrar Cliente</Link>
          <Link to="/agendar-cita" className="btn">📅 Agendar Cita</Link>
          <Link to="/diagnostico-vehiculo" className="btn">🔧 Diagnóstico</Link>
          <Link to="/facturacion" className="btn">💳 Generar Factura</Link>
        </div>
      </div>

      {/* Actividades Recientes */}
      <div className="actividades">
        <h3>🕒 Actividades Recientes</h3>
        <ul>
          {actividadesRecientes.map((actividad, index) => (
            <li key={index}>{actividad}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
