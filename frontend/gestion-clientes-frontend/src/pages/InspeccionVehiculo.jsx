import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Estilos/InspeccionVehiculo.css";

const InspeccionVehiculo = () => {
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

  // 🚗 Cargar datos desde localStorage al montar el componente
  const [inspeccion, setInspeccion] = useState(() => {
    const inspeccionGuardada = localStorage.getItem("inspeccion");
    return inspeccionGuardada
      ? JSON.parse(inspeccionGuardada)
      : partesVehiculo.reduce((estado, parte) => {
          estado[parte] = "";
          return estado;
        }, {});
  });

  const navigate = useNavigate();

  // 🛠 Manejar cambios en la selección y guardar en localStorage en tiempo real
  const handleSelectChange = (parte, estado) => {
    const nuevaInspeccion = { ...inspeccion, [parte]: estado };
    setInspeccion(nuevaInspeccion);
    localStorage.setItem("inspeccion", JSON.stringify(nuevaInspeccion));
  };

  // ✅ Validar progreso
  const partesCompletadas = Object.values(inspeccion).filter((estado) => estado !== "").length;
  const totalPartes = partesVehiculo.length;
  const isInspeccionCompleta = partesCompletadas === totalPartes;

  // 🚀 Guardar y continuar al diagnóstico
  const handleSiguiente = () => {
    if (!isInspeccionCompleta) {
      if (!window.confirm("🚨 Aún hay partes sin inspeccionar. ¿Desea continuar de todos modos?")) {
        return;
      }
    }
    navigate("/diagnostico-vehiculo");
  };

  return (
    <div className="inspeccion-container">
      <h2>🔍 Inspección del Vehículo</h2>
      <p>📝 Progreso: {partesCompletadas} de {totalPartes} partes inspeccionadas</p>
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
        <button type="button" onClick={handleSiguiente} className="btn-siguiente">
          {isInspeccionCompleta ? "✅ Completar Inspección" : "➡ Siguiente (Incompleto)"}
        </button>
      </form>
    </div>
  );
};

export default InspeccionVehiculo;
