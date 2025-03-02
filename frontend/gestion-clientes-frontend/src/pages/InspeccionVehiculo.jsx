import { useState } from "react";
import { Link } from "react-router-dom";
import "./InspeccionVehiculo.css";

const InspeccionVehiculo = () => {
  // Lista de partes a inspeccionar
  const partesVehiculo = [
    "Luces delanteras",
    "Luces traseras",
    "Frenos",
    "Aceite del motor",
    "Batería",
    "Filtro de aire",
    "Presión de neumáticos",
    "Amortiguadores",
    "Dirección",
    "Sistema de escape",
  ];

  // Estado para cada parte del vehículo
  const [inspeccion, setInspeccion] = useState(
    partesVehiculo.reduce((estado, parte) => {
      estado[parte] = "";
      return estado;
    }, {})
  );

  // Manejar cambios en la selección de estado
  const handleSelectChange = (parte, estado) => {
    setInspeccion({ ...inspeccion, [parte]: estado });
  };

  // Guardar la inspección y redirigir al diagnóstico
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inspección registrada:", inspeccion);
    alert("Inspección registrada correctamente ✅");

    // Guardar en localStorage
    localStorage.setItem("inspeccion", JSON.stringify(inspeccion));
  };

  return (
    <div className="inspeccion-container">
      <h2>🔍 Inspección del Vehículo</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>Parte</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {partesVehiculo.map((parte, index) => (
              <tr key={index}>
                <td>{parte}</td>
                <td>
                  <select
                    value={inspeccion[parte]}
                    onChange={(e) => handleSelectChange(parte, e.target.value)}
                    required
                  >
                    <option value="">Seleccionar</option>
                    <option value="normal">✅ Normal</option>
                    <option value="reparar">🔧 Reparar</option>
                    <option value="cambiar">♻ Cambiar</option>
                    <option value="anormal">❌ Anormal</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit">Guardar Inspección</button>
        <button onClick={() => navigate("/diagnostico")} className="btn-siguiente">
        Siguiente ➡
      </button>
      </form>

      {/* Botón para ir al Diagnóstico */}
      <div className="navegacion">
        <Link to="/diagnostico-vehiculo">
          <button>Ir a Diagnóstico</button>
        </Link>
      </div>
    </div>
  );
};

export default InspeccionVehiculo;