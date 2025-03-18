import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Estilos/DiagnosticoVehiculo.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DiagnosticoVehiculo = () => {
  // Cargar datos de inspección previa
  const [inspeccionPrev, setInspeccionPrev] = useState(null);

  useEffect(() => {
    const inspeccionGuardada = localStorage.getItem("inspeccion");
    if (inspeccionGuardada) {
      setInspeccionPrev(JSON.parse(inspeccionGuardada));
    }
  }, []);

  // Estado inicial del diagnóstico
  const [estado, setEstado] = useState({
    motor: "Normal",
    bateria: "Normal",
    frenos: "Normal",
    presionNeumaticos: {
      frontalIzq: "Normal",
      frontalDer: "Normal",
      traseraIzq: "Normal",
      traseraDer: "Normal",
    },
    balanceo: {
      frontalIzq: 0.5,
      frontalDer: -0.3,
      traseraIzq: 0.7,
      traseraDer: -0.4,
    },
  });

  // Funciones para manejar cambios
  const handleChange = (componente, valor) => {
    setEstado((prev) => ({
      ...prev,
      [componente]: valor,
    }));
  };

  const handleNeumaticoChange = (posicion, valor) => {
    setEstado((prev) => ({
      ...prev,
      presionNeumaticos: {
        ...prev.presionNeumaticos,
        [posicion]: valor,
      },
    }));
  };

  const handleBalanceoChange = (posicion, valor) => {
    setEstado((prev) => ({
      ...prev,
      balanceo: {
        ...prev.balanceo,
        [posicion]: parseFloat(valor),
      },
    }));
  };

  // Datos para gráficas
  const dataPresion = {
    labels: ["Frontal Izq.", "Frontal Der.", "Trasera Izq.", "Trasera Der."],
    datasets: [
      {
        label: "Estado",
        data: [
          estado.presionNeumaticos.frontalIzq === "Baja" ? 25 : 30,
          estado.presionNeumaticos.frontalDer === "Baja" ? 25 : 30,
          estado.presionNeumaticos.traseraIzq === "Baja" ? 25 : 30,
          estado.presionNeumaticos.traseraDer === "Baja" ? 25 : 30,
        ],
        backgroundColor: Object.values(estado.presionNeumaticos).map((p) =>
          p === "Baja" ? "#f44336" : "#4caf50"
        ),
      },
    ],
  };

  const dataBalanceoBarras = {
    labels: ["Frontal Izq.", "Frontal Der.", "Trasera Izq.", "Trasera Der."],
    datasets: [
      {
        label: "Ángulo de Caída (°)",
        data: Object.values(estado.balanceo),
        backgroundColor: Object.values(estado.balanceo).map((angulo) =>
          angulo > 0 ? "#4caf50" : "#f44336"
        ),
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
      },
    ],
  };

  // Recomendaciones automáticas
  const getRecomendaciones = () => {
    const recomendaciones = [];

    Object.entries(estado.presionNeumaticos).forEach(([posicion, estadoNeumatico]) => {
      if (estadoNeumatico === "Baja") {
        recomendaciones.push(
          `Se recomienda inflar el neumático ${posicion.replace(/([A-Z])/g, " $1")} a 30 PSI.`
        );
      }
    });

    Object.entries(estado.balanceo).forEach(([posicion, angulo]) => {
      if (Math.abs(angulo) > 1.0) {
        recomendaciones.push(
          `Se recomienda realizar una alineación en las ruedas ${posicion.replace(
            /([A-Z])/g,
            " $1"
          )}.`
        );
      }
    });

    if (estado.motor === "Falla") {
      recomendaciones.push("Se recomienda revisar el motor debido a fallas detectadas.");
    }
    if (estado.bateria === "Baja") {
      recomendaciones.push("Se recomienda cargar o reemplazar la batería.");
    }
    if (estado.frenos === "Desgastados") {
      recomendaciones.push("Se recomienda inspeccionar y cambiar las pastillas de freno.");
    }

    return recomendaciones;
  };

  return (
    <div className="diagnostico-container">
      <h2>🛠 Diagnóstico del Vehículo</h2>

      {/* Mostrar datos de inspección previa */}
      {inspeccionPrev && (
        <div className="inspeccion-previa">
          <h3>Datos de Inspección Previa</h3>
          <ul>
            {Object.entries(inspeccionPrev).map(([parte, estado], index) => (
              <li key={index}>
                {parte}: {estado}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Controles para seleccionar estado */}
      <div className="controles-diagnostico">
        <label>🚗 Motor:</label>
        <select value={estado.motor} onChange={(e) => handleChange("motor", e.target.value)}>
          <option value="Normal">Normal</option>
          <option value="Falla">Falla</option>
        </select>

        <label>🔋 Batería:</label>
        <select value={estado.bateria} onChange={(e) => handleChange("bateria", e.target.value)}>
          <option value="Normal">Normal</option>
          <option value="Baja">Baja</option>
        </select>

        <label>🛑 Frenos:</label>
        <select value={estado.frenos} onChange={(e) => handleChange("frenos", e.target.value)}>
          <option value="Normal">Normal</option>
          <option value="Desgastados">Desgastados</option>
        </select>

        <label>⬤ Ruedas:</label>
        <select
          value={estado.presionNeumaticos.frontalIzq}
          onChange={(e) => handleNeumaticoChange("frontalIzq", e.target.value)}
        >
          <option value="Normal">Frontal Izq. Normal</option>
          <option value="Baja">Frontal Izq. Baja</option>
        </select>
        <select
          value={estado.presionNeumaticos.frontalDer}
          onChange={(e) => handleNeumaticoChange("frontalDer", e.target.value)}
        >
          <option value="Normal">Frontal Der. Normal</option>
          <option value="Baja">Frontal Der. Baja</option>
        </select>
      </div>

      {/* Controles para editar balanceo */}
      <div className="controles-diagnostico">
        <label>🔄 Balanceo Frontal Izq:</label>
        <input
          type="number"
          step="0.1"
          value={estado.balanceo.frontalIzq}
          onChange={(e) => handleBalanceoChange("frontalIzq", e.target.value)}
        />
        <label>🔄 Balanceo Frontal Der:</label>
        <input
          type="number"
          step="0.1"
          value={estado.balanceo.frontalDer}
          onChange={(e) => handleBalanceoChange("frontalDer", e.target.value)}
        />
        <label>🔄 Balanceo Trasera Izq:</label>
        <input
          type="number"
          step="0.1"
          value={estado.balanceo.traseraIzq}
          onChange={(e) => handleBalanceoChange("traseraIzq", e.target.value)}
        />
        <label>🔄 Balanceo Trasera Der:</label>
        <input
          type="number"
          step="0.1"
          value={estado.balanceo.traseraDer}
          onChange={(e) => handleBalanceoChange("traseraDer", e.target.value)}
        />
      </div>

      {/* Gráficas */}
      <div className="diagnostico-panel">
        <div className="chart">
          <h3>📊 Presión de Neumáticos</h3>
          <Bar data={dataPresion} />
        </div>

        <div className="chart">
          <h3>📏 Ángulo de Alineación (Balanceo)</h3>
          <Bar
            data={dataBalanceoBarras}
            options={{
              indexAxis: "y", // Barras horizontales
              scales: {
                x: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => `${value}°`, // Mostrar grados en el eje X
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Recomendaciones Automáticas */}
      <div className="recomendaciones">
        <h3>💡 Recomendaciones</h3>
        <ul>
          {getRecomendaciones().length > 0 ? (
            getRecomendaciones().map((recomendacion, index) => (
              <li key={index}>{recomendacion}</li>
            ))
          ) : (
            <li>No se encontraron problemas críticos.</li>
          )}
        </ul>
      </div>
      <button onClick={() => navigate("./Facturacion.jsx")} className="btn-siguiente">
        Siguiente ➡
      </button>
    </div>
  );
};

export default DiagnosticoVehiculo;