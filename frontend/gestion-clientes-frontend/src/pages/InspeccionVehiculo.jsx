import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  // Hook de navegación
  const navigate = useNavigate();

  // Manejar cambios en la selección de estado
  const handleSelectChange = (parte, estado) => {
    setInspeccion({ ...inspeccion, [parte]: estado });
  };

  // Validar que todas las partes estén inspeccionadas
  const isInspeccionCompleta = () => {
    return partesVehiculo.every((parte) => inspeccion[parte] !== "");
  };

  // Guardar la inspección y redirigir al diagnóstico
  const handleSiguiente = () => {
    if (!isInspeccionCompleta()) {
      alert("Por favor, completa la inspección de todas las partes antes de continuar.");
      return;
    }

    // Guardar en localStorage
    localStorage.setItem("inspeccion", JSON.stringify(inspeccion));
    console.log("Inspección registrada:", inspeccion);

    // Redirigir al diagnóstico
    navigate("/diagnostico-vehiculo");
  };

  return (
    <div className="inspeccion-container">
      <h2>🔍 Inspección del Vehículo</h2>
      <form>
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

        {/* Botón Siguiente */}
        <button
          type="button"
          onClick={handleSiguiente}
          disabled={!isInspeccionCompleta()}
          className="btn-siguiente"
        >
          Siguiente ➡
        </button>
      </form>
    </div>
  );
};

export default InspeccionVehiculo;