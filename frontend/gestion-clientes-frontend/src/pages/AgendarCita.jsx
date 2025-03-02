import { useState, useEffect } from "react";
import "./AgendarCita.css";

const AgendarCita = () => {
  // Estado para la cita
  const [cita, setCita] = useState({
    fecha: "",
    hora: "",
    servicio: "",
  });

  // Estado para almacenar las citas agendadas
  const [citasAgendadas, setCitasAgendadas] = useState([]);

  // Lista de servicios disponibles
  const serviciosDisponibles = [
    "Cambio de Aceite",
    "Alineación y Balanceo",
    "Cambio de Filtros",
    "Revisión General",
    "Cambio de Batería",
  ];

  // Cargar citas almacenadas en LocalStorage al iniciar
  useEffect(() => {
    const citasGuardadas = JSON.parse(localStorage.getItem("citasTaller"));
    if (citasGuardadas) {
      setCitasAgendadas(citasGuardadas);
    }
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setCita({ ...cita, [e.target.name]: e.target.value });
  };

  // Guardar cita en LocalStorage
  const agendarCita = (e) => {
    e.preventDefault();
    if (!cita.fecha || !cita.hora || !cita.servicio) {
      alert("❌ Debes completar todos los campos.");
      return;
    }

    const nuevasCitas = [...citasAgendadas, cita];
    setCitasAgendadas(nuevasCitas);
    localStorage.setItem("citasTaller", JSON.stringify(nuevasCitas));

    alert("✅ Cita agendada correctamente.");
    setCita({ fecha: "", hora: "", servicio: "" }); // Reiniciar formulario
  };

  return (
    <div className="citas-container">
      <h2>📅 Agendamiento de Citas</h2>

      {/* Formulario para agendar */}
      <form onSubmit={agendarCita}>
        <label>Fecha:</label>
        <input type="date" name="fecha" value={cita.fecha} onChange={handleChange} required />

        <label>Hora:</label>
        <input type="time" name="hora" value={cita.hora} onChange={handleChange} required />

        <label>Servicio:</label>
        <select name="servicio" value={cita.servicio} onChange={handleChange} required>
          <option value="">Selecciona un servicio</option>
          {serviciosDisponibles.map((servicio, index) => (
            <option key={index} value={servicio}>
              {servicio}
            </option>
          ))}
        </select>

        <button type="submit">📌 Agendar Cita</button>
      </form>

      {/* Mostrar citas agendadas */}
      <h3>📋 Citas Agendadas</h3>
      <ul>
        {citasAgendadas.length > 0 ? (
          citasAgendadas.map((cita, index) => (
            <li key={index}>
              🗓 {cita.fecha} ⏰ {cita.hora} - {cita.servicio}
            </li>
          ))
        ) : (
          <p>No hay citas agendadas.</p>
        )}
      </ul>
    </div>
  );
};

export default AgendarCita;
