import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Estilos/InspeccionVehiculo.css";

const InspeccionVehiculo = () => {
  const navigate = useNavigate();

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

  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [vehiculosCliente, setVehiculosCliente] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState("");

  useEffect(() => {
    const clientesGuardados = JSON.parse(localStorage.getItem("clientes")) || [];
    if (!Array.isArray(clientesGuardados)) {
      console.error("Los datos de clientes en localStorage no son válidos.");
      setClientes([]);
    } else {
      const clientesConIdString = clientesGuardados.map((cliente) => ({
        ...cliente,
        id: String(cliente.id),
      }));
      setClientes(clientesConIdString);
    }
  }, []);

  useEffect(() => {
    if (clienteSeleccionado) {
      const cliente = clientes.find((c) => c.id === clienteSeleccionado);
      if (cliente) {
        setVehiculosCliente(cliente.vehiculos || []);
      } else {
        console.warn("No se encontró el cliente seleccionado.");
        setVehiculosCliente([]);
      }
    } else {
      setVehiculosCliente([]);
    }
  }, [clienteSeleccionado, clientes]);

  const [inspeccion, setInspeccion] = useState(() =>
    partesVehiculo.reduce((estado, parte) => {
      estado[parte] = "";
      return estado;
    }, {})
  );

  const handleSelectChange = (parte, estado) => {
    setInspeccion({ ...inspeccion, [parte]: estado });
  };

  const isInspeccionCompleta = partesVehiculo.every((parte) => inspeccion[parte] !== "");

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

    const inspeccionesGuardadas = JSON.parse(localStorage.getItem("inspecciones")) || {};
    inspeccionesGuardadas[vehiculoSeleccionado] = inspeccion;
    localStorage.setItem("inspecciones", JSON.stringify(inspeccionesGuardadas));

    navigate("/diagnostico-vehiculo");
  };

  return (
    <div className="inspeccion-container">
      <h2>🔍 Inspección del Vehículo</h2>

      <label>👤 Seleccionar Cliente:</label>
      <select
        value={clienteSeleccionado}
        onChange={(e) => {
          console.log("Cliente seleccionado:", e.target.value);
          setClienteSeleccionado(e.target.value);
        }}
      >
        <option value="">Seleccione un cliente</option>
        {clientes.map((cliente) => (
          <option key={cliente.id} value={cliente.id}>
            {cliente.nombre} (ID: {cliente.id})
          </option>
        ))}
      </select>

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

      <button type="button" onClick={handleSiguiente} className="btn-siguiente">
        {isInspeccionCompleta ? "✅ Completar Inspección" : "➡ Siguiente (Incompleto)"}
      </button>
    </div>
  );
};

export default InspeccionVehiculo;