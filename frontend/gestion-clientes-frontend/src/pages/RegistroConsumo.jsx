import { useState } from "react";
import "./RegistroConsumo.css";

const RegistroConsumo = () => {
  const [consumo, setConsumo] = useState({
    clienteId: "",
    servicio: "",
    costo: "",
    fecha: "",
  });

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
    console.log("Consumo registrado:", consumo);
    alert("Consumo registrado correctamente ✅");
    setConsumo({ clienteId: "", servicio: "", costo: "", fecha: "" }); // Limpiar formulario
  };

  return (
    <div className="registro-consumo-container">
      <h2>🛠 Registro de Consumo</h2>
      <form onSubmit={handleSubmit}>
        <label>ID del Cliente:</label>
        <input
          type="text"
          name="clienteId"
          value={consumo.clienteId}
          onChange={handleChange}
          required
          placeholder="Ingrese ID del cliente"
        />

        <label>Servicio:</label>
        <select name="servicio" value={consumo.servicio} onChange={handleChange} required>
          <option value="">Seleccione un servicio</option>
          {serviciosDisponibles.map((servicio, index) => (
            <option key={index} value={servicio}>{servicio}</option>
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
