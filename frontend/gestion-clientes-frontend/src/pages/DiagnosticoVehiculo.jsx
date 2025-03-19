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
import { useNavigate } from "react-router-dom"; // Para redirección
import "./Estilos/DiagnosticoVehiculo.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DiagnosticoVehiculo = () => {
  const navigate = useNavigate(); // Hook para redirección

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
        data: Object.values(estado.presionNeumaticos).map((p) =>
          p === "Baja" ? 25 : 30
        ),
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

  // Manejador de redirección
  const handleSiguiente = () => {
    // Validar si hay problemas críticos antes de avanzar
    const recomendaciones = getRecomendaciones();
    if (recomendaciones.length > 0) {
      const confirmacion = window.confirm(
        "Hay problemas críticos detectados. ¿Desea continuar?"
      );
      if (!confirmacion) return;
    }

    // Redirigir a la página de facturación
    navigate("/facturacion");
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
        <h3>🔧 Estado del Vehículo</h3>
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
        {Object.keys(estado.presionNeumaticos).map((posicion) => (
          <select
            key={posicion}
            value={estado.presionNeumaticos[posicion]}
            onChange={(e) => handleNeumaticoChange(posicion, e.target.value)}
          >
            <option value="Normal">{`${posicion.replace(/([A-Z])/g, " $1")} Normal`}</option>
            <option value="Baja">{`${posicion.replace(/([A-Z])/g, " $1")} Baja`}</option>
          </select>
        ))}
      </div>

      {/* Controles para editar balanceo */}
      <div className="controles-diagnostico">
        <h3>🔄 Balanceo de Ruedas</h3>
        {Object.keys(estado.balanceo).map((posicion) => (
          <div key={posicion}>
            <label>{`${posicion.replace(/([A-Z])/g, " $1")}:`}</label>
            <input
              type="number"
              step="0.1"
              value={estado.balanceo[posicion]}
              onChange={(e) => handleBalanceoChange(posicion, e.target.value)}
            />
          </div>
        ))}
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

      {/* Botón Siguiente */}
      <button onClick={handleSiguiente} className="btn-siguiente">
        Siguiente ➡
      </button>
    </div>
  );
};

export default DiagnosticoVehiculo;