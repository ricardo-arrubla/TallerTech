import { useState } from "react";
import "./RegistroConsumo.css";

const RegistroConsumo = () => {
  const [consumo, setConsumo] = useState({
    clienteId: "",
    placaVehiculo: "", // Nueva propiedad
    servicio: "",
    costo: "",
    fecha: "",
  });

  // Datos simulados de clientes y vehículos
  const clientesRegistrados = ["C001", "C002", "C003"];
  const placasVehiculos = ["ABC123", "XYZ456", "DEF789"];

  const serviciosDisponibles = [
    "Cambio de Aceite",
    "Alineación y Balanceo",
    "Revisión de Frenos",
    "Revisión de Motor",
    "Cambio de Neumáticos",
  ];

  const handleChange = (e) => {
    setConsumo({ ...consumo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!consumo.clienteId || !consumo.servicio || !consumo.costo || !consumo.fecha) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    console.log("Consumo registrado:", consumo);
    alert("Consumo registrado correctamente ✅");

    // Limpiar formulario
    setConsumo({
      clienteId: "",
      placaVehiculo: "",
      servicio: "",
      costo: "",
      fecha: "",
    });
  };

  return (
    <div className="registro-consumo-container">
      <h2>🛠 Registro de Consumo</h2>
      <form onSubmit={handleSubmit}>
        <label>ID del Cliente:</label>
        <select name="clienteId" value={consumo.clienteId} onChange={handleChange} required>
          <option value="">Seleccione un cliente</option>
          {clientesRegistrados.map((cliente, index) => (
            <option key={index} value={cliente}>
              {cliente}
            </option>
          ))}
        </select>

        <label>Placa del Vehículo:</label>
        <select name="placaVehiculo" value={consumo.placaVehiculo} onChange={handleChange} required>
          <option value="">Seleccione una placa</option>
          {placasVehiculos.map((placa, index) => (
            <option key={index} value={placa}>
              {placa}
            </option>
          ))}
        </select>

        <label>Servicio:</label>
        <select name="servicio" value={consumo.servicio} onChange={handleChange} required>
          <option value="">Seleccione un servicio</option>
          {serviciosDisponibles.map((servicio, index) => (
            <option key={index} value={servicio}>
              {servicio}
            </option>
          ))}
        </select>

        <label>Costo ($):</label>
        <input
          type="number"
          name="costo"
          value={consumo.costo}
          onChange={handleChange}
          required
          placeholder="Ingrese costo"
        />

        <label>Fecha:</label>
        <input
          type="date"
          name="fecha"
          value={consumo.fecha}
          onChange={handleChange}
          required
        />

        <button type="submit">Registrar Consumo</button>
      </form>
    </div>
  );
};

export default RegistroConsumo;