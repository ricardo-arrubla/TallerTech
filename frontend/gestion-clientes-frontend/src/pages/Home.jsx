import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./Estilos/Home.css";

const Home = () => {
  // 📊 Cargar métricas desde localStorage o establecer valores por defecto
  const [metrics, setMetrics] = useState({
    serviciosPendientes: 0,
    citasHoy: 0,
    ingresosMes: 0,
    serviciosEnProgreso: 0,
  });

  // 📅 Cargar próximas citas
  const [proximasCitas, setProximasCitas] = useState([]);
  const [notas, setNotas] = useState("");

  useEffect(() => {
    // Simulación de carga de datos desde localStorage
    const citas = JSON.parse(localStorage.getItem("citasTaller")) || [];
    const ingresos = JSON.parse(localStorage.getItem("facturas")) || [];
    const diagnosticos = JSON.parse(localStorage.getItem("diagnosticos")) || {};

    // Filtrar citas para hoy 📅
    const hoy = new Date().toISOString().split("T")[0];
    const citasHoy = citas.filter((cita) => cita.fecha === hoy);

    setMetrics({
      serviciosPendientes: citas.length,
      citasHoy: citasHoy.length,
      ingresosMes: ingresos.reduce((sum, f) => sum + f.total, 0),
      serviciosEnProgreso: Object.keys(diagnosticos).length, // Número de diagnósticos sin finalizar
    });

    setProximasCitas(citasHoy);

    // Cargar notas previas del taller
    const notasGuardadas = localStorage.getItem("notasTaller");
    if (notasGuardadas) {
      setNotas(notasGuardadas);
    }
  }, []);

  // 📊 Datos de gráficos
  const dataServicios = {
    labels: ["Cambio de Aceite", "Alineación", "Revisión", "Frenos"],
    datasets: [
      {
        label: "Servicios Realizados",
        data: [20, 15, 10, 8],
        backgroundColor: ["#4caf50", "#ffcc00", "#2196F3", "#f44336"],
      },
    ],
  };

  const dataIngresos = {
    labels: ["Enero", "Febrero", "Marzo", "Abril"],
    datasets: [
      {
        label: "Ingresos ($)",
        data: [2000, 1800, 2200, 2500],
        backgroundColor: ["#4caf50", "#ff9800", "#f44336", "#2196f3"],
      },
    ],
  };

  // 📝 Manejar notas del taller y guardarlas en localStorage
  const handleNotasChange = (e) => {
    const nuevaNota = e.target.value;
    setNotas(nuevaNota);
    localStorage.setItem("notasTaller", nuevaNota);
  };

  return (
    <div className="home-container">
      <div className="contenido">
        {/* 🏠 Encabezado */}
        <div className="header">
          <img src="/TallerTechLogo3.png" alt="Logo TallerTech" className="logo" />
          <h1>Bienvenido a TallerTech</h1>
          <p>📅 {new Date().toLocaleDateString()}</p>
        </div>

        {/* 📌 Estado del Taller */}
        <div className="estado-taller">
          <h3>📊 Estado del Taller</h3>
          <div className="metricas">
            <div className="card">⚙️ <strong>Servicios Pendientes:</strong> {metrics.serviciosPendientes}</div>
            <div className="card">📅 <strong>Citas Hoy:</strong> {metrics.citasHoy}</div>
            <div className="card">🛠 <strong>Servicios en Progreso:</strong> {metrics.serviciosEnProgreso}</div>
            <div className="card">💰 <strong>Ingresos Mes:</strong> ${metrics.ingresosMes}</div>
          </div>
        </div>

        {/* 📊 Gráficos de Actividad */}
        <div className="graficos">
          <div className="grafico-container">
            <h3>📈 Servicios Realizados</h3>
            <Bar data={dataServicios} />
          </div>
          <div className="grafico-container">
            <h3>💰 Ingresos Mensuales</h3>
            <Pie data={dataIngresos} />
          </div>
        </div>

        {/* 📅 Próximas Citas */}
        <div className="citas-hoy">
          <h3>📅 Próximas Citas de Hoy</h3>
          {proximasCitas.length > 0 ? (
            <ul>
              {proximasCitas.map((cita, index) => (
                <li key={index}>
                  🕒 {cita.hora} - {cita.servicio} (📞 {cita.telefono})
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay citas programadas para hoy.</p>
          )}
        </div>

        {/* 🚀 Accesos Directos para el Mecánico */}
        <div className="acciones-rapidas">
          <h3>🚀 Accesos Rápidos</h3>
          <div className="acciones-botones">
            <Link to="/diagnostico-vehiculo" className="btn">🔧 Diagnóstico</Link>
            <Link to="/historial-servicios" className="btn">📋 Historial de Servicios</Link>
            <Link to="/facturacion" className="btn">💳 Facturación</Link>
            <Link to="/reportes" className="btn">📊 Reportes</Link>
          </div>
        </div>

        {/* 📝 Notas del Taller */}
        <div className="notas-taller">
          <h3>📝 Notas del Taller</h3>
          <textarea
            value={notas}
            onChange={handleNotasChange}
            placeholder="Escribe aquí comentarios sobre el día de trabajo..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Home;
