import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Estilos/InspeccionVehiculo.css";

const InspeccionVehiculo = () => {
  const navigate = useNavigate();

  // 🔹 Lista de partes a inspeccionar
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

  // 🧑‍🔧 Estado para selección de cliente y vehículo
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [vehiculosCliente, setVehiculosCliente] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState("");

  // 🔍 Cargar clientes desde `localStorage`
  useEffect(() => {
    const clientesGuardados = JSON.parse(localStorage.getItem("clientes")) || [];
    setClientes(clientesGuardados);
  }, []);

  // 🚗 Cargar vehículos del cliente seleccionado
  useEffect(() => {
    if (clienteSeleccionado) {
      const cliente = clientes.find((c) => c.id === clienteSeleccionado);
      setVehiculosCliente(cliente?.vehiculos || []);
    } else {
      setVehiculosCliente([]);
    }
  }, [clienteSeleccionado, clientes]);

  // 🔍 Estado para la inspección del vehículo
  const [inspeccion, setInspeccion] = useState(() => {
    return partesVehiculo.reduce((estado, parte) => {
      estado[parte] = "";
      return estado;
    }, {});
  });

  // 🛠 Manejar cambios en la inspección
  const handleSelectChange = (parte, estado) => {
    setInspeccion({ ...inspeccion, [parte]: estado });
  };

  // 🔹 Validar si la inspección está completa
  const isInspeccionCompleta = partesVehiculo.every((parte) => inspeccion[parte] !== "");

  // 🚀 Guardar inspección y continuar
  const handleSiguiente = () => {
    if (!clienteSeleccionado || !vehiculoSeleccionado) {
      alert("❌ Debes seleccionar un cliente y un vehículo antes de continuar.");
      return;
    }

    if (!isInspeccionCompleta) {
      if (!window.confirm("🚨 Aún hay partes sin inspeccionar. ¿Desea continuar de todos modos?")) {
        return;
      }
    }

    // 📌 Guardar inspección asociada al vehículo
    const inspeccionesGuardadas = JSON.parse(localStorage.getItem("inspecciones")) || {};
    inspeccionesGuardadas[vehiculoSeleccionado] = inspeccion;
    localStorage.setItem("inspecciones", JSON.stringify(inspeccionesGuardadas));

    navigate("/diagnostico-vehiculo");
  };

  return (
    <div className="inspeccion-container">
      <h2>🔍 Inspección del Vehículo</h2>

      {/* 🏠 Selección de Cliente */}
      <label>👤 Seleccionar Cliente:</label>
      <select value={clienteSeleccionado} onChange={(e) => setClienteSeleccionado(e.target.value)}>
        <option value="">Seleccione un cliente</option>
        {clientes.map((cliente) => (
          <option key={cliente.id} value={cliente.id}>
            {cliente.nombre} (ID: {cliente.id})
          </option>
        ))}
      </select>

      {/* 🚗 Selección de Vehículo */}
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

      {/* 🛠 Tabla de Inspección */}
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

      {/* 🚀 Botón para continuar */}
      <button type="button" onClick={handleSiguiente} className="btn-siguiente">
        {isInspeccionCompleta ? "✅ Completar Inspección" : "➡ Siguiente (Incompleto)"}
      </button>
    </div>
  );
};

export default InspeccionVehiculo;
