import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "./Estilos/AgendarCita.css";

const AgendarCita = () => {
  // Estados para selección de cliente y vehículo
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [vehiculosCliente, setVehiculosCliente] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState("");

  // Estado para la cita
  const [cita, setCita] = useState({
    fecha: "",
    hora: "",
    servicio: "",
    email: "",
    telefono: "",
  });

  // Lista de servicios disponibles
  const serviciosDisponibles = [
    "Cambio de Aceite",
    "Alineación y Balanceo",
    "Cambio de Filtros",
    "Revisión General",
    "Cambio de Batería",
  ];

  // Cargar clientes desde LocalStorage al iniciar
  useEffect(() => {
    const clientesGuardados = JSON.parse(localStorage.getItem("clientes")) || [];
    setClientes(clientesGuardados);
  }, []);

  // Cargar vehículos del cliente seleccionado
  useEffect(() => {
    if (clienteSeleccionado) {
      const cliente = clientes.find((c) => c.id === clienteSeleccionado);
      setVehiculosCliente(cliente?.vehiculos || []);
    } else {
      setVehiculosCliente([]);
    }
  }, [clienteSeleccionado, clientes]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setCita({ ...cita, [e.target.name]: e.target.value });
  };

  // Enviar email con EmailJS
  const enviarRecordatorio = (cita) => {
    const templateParams = {
      name: clienteSeleccionado,
      vehiculo: vehiculoSeleccionado,
      fecha: cita.fecha,
      hora: cita.hora,
      servicio: cita.servicio,
      email: cita.email,
    };

    emailjs
      .send("service_vcu3hss", "template_12smrqi", templateParams, "jc2KHEe6_bqatSo0Q")
      .then((response) => {
        console.log("✅ Email enviado con éxito:", response);
      })
      .catch((error) => {
        console.error("❌ Error al enviar email:", error);
      });
  };

  // Guardar cita en LocalStorage
  const agendarCita = (e) => {
    e.preventDefault();
    if (!clienteSeleccionado || !vehiculoSeleccionado || !cita.fecha || !cita.hora || !cita.servicio || !cita.email || !cita.telefono) {
      alert("❌ Debes completar todos los campos.");
      return;
    }

    const nuevaCita = { cliente: clienteSeleccionado, vehiculo: vehiculoSeleccionado, ...cita };
    const citasGuardadas = JSON.parse(localStorage.getItem("citasTaller")) || [];
    citasGuardadas.push(nuevaCita);
    localStorage.setItem("citasTaller", JSON.stringify(citasGuardadas));

    enviarRecordatorio(nuevaCita);

    alert("✅ Cita agendada correctamente. Se ha enviado un recordatorio por correo.");
    setCita({ fecha: "", hora: "", servicio: "", email: "", telefono: "" });
    setVehiculoSeleccionado(""); // Reiniciar selección
  };

  return (
    <div className="citas-container">
      <h2>📅 Agendamiento de Citas</h2>

      {/* Selección de Cliente */}
      <label>👤 Seleccionar Cliente:</label>
      <select value={clienteSeleccionado} onChange={(e) => setClienteSeleccionado(e.target.value)}>
        <option value="">Seleccione un cliente</option>
        {clientes.map((cliente) => (
          <option key={cliente.id} value={cliente.id}>
            {cliente.nombre} (ID: {cliente.id})
          </option>
        ))}
      </select>

      {/* Selección de Vehículo */}
      <label>🚗 Seleccionar Vehículo:</label>
      <select
        value={vehiculoSeleccionado}
        onChange={(e) => setVehiculoSeleccionado(e.target.value)}
        disabled={!clienteSeleccionado}
      >
        <option value="">Seleccione un vehículo</option>
        {vehiculosCliente.map((vehiculo, index) => (
          <option key={index} value={vehiculo.placa}>
            {vehiculo.marca} - {vehiculo.placa}
          </option>
        ))}
      </select>

      {/* Formulario de Agendamiento */}
      <form onSubmit={agendarCita}>
        <label>📅 Fecha:</label>
        <input type="date" name="fecha" value={cita.fecha} onChange={handleChange} required />

        <label>⏰ Hora:</label>
        <input type="time" name="hora" value={cita.hora} onChange={handleChange} required />

        <label>🛠 Servicio:</label>
        <select name="servicio" value={cita.servicio} onChange={handleChange} required>
          <option value="">Selecciona un servicio</option>
          {serviciosDisponibles.map((servicio, index) => (
            <option key={index} value={servicio}>
              {servicio}
            </option>
          ))}
        </select>

        <label>📩 Correo Electrónico:</label>
        <input
          type="email"
          name="email"
          value={cita.email}
          onChange={handleChange}
          placeholder="Ingrese su correo"
          required
        />

        <label>📞 Teléfono:</label>
        <input
          type="tel"
          name="telefono"
          value={cita.telefono}
          onChange={handleChange}
          placeholder="Ingrese su teléfono"
          required
        />

        <button type="submit">📌 Agendar Cita</button>
      </form>

      {/* Mostrar Citas Agendadas */}
      <h3>📋 Citas Agendadas</h3>
      <ul>
        {JSON.parse(localStorage.getItem("citasTaller") || "[]").map((cita, index) => (
          <li key={index}>
            <strong>Cliente:</strong> {cita.cliente} <br />
            <strong>Vehículo:</strong> {cita.vehiculo} <br />
            🗓 {cita.fecha} ⏰ {cita.hora} - {cita.servicio} <br />
            📩 {cita.email} | 📞 {cita.telefono}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgendarCita;
