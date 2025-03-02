import { useState, useEffect } from "react";
import "./Consulta.css";

const Consulta = () => {
  // Datos de consumos (Simulados)
  const [consumos, setConsumos] = useState([
    { id: "001", cliente: "Juan Pérez", placa: "ABC123", servicio: "Cambio de Aceite", precio: 30 },
    { id: "002", cliente: "María García", placa: "XYZ789", servicio: "Alineación y Balanceo", precio: 50 },
    { id: "003", cliente: "Carlos López", placa: "LMN456", servicio: "Cambio de Filtros", precio: 40 },
    { id: "004", cliente: "Juan Pérez", placa: "ABC123", servicio: "Revisión General", precio: 80 },
  ]);

  // Estado para la búsqueda
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("cliente");

  // Filtrar consumos según búsqueda
  const consumosFiltrados = consumos.filter((c) =>
    c[filtro].toLowerCase().includes(busqueda.toLowerCase())
  );

  // Calcular total de gastos por cliente
  const calcularTotal = () => {
    let totalPorCliente = {};
    consumos.forEach((c) => {
      totalPorCliente[c.cliente] = (totalPorCliente[c.cliente] || 0) + c.precio;
    });
    return totalPorCliente;
  };

  return (
    <div className="consulta-container">
      <h2>📊 Consulta de Consumos</h2>

      {/* Barra de búsqueda */}
      <div className="busqueda-container">
        <input
          type="text"
          placeholder={`Buscar por ${filtro}...`}
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <select onChange={(e) => setFiltro(e.target.value)}>
          <option value="cliente">Cliente</option>
          <option value="placa">Placa</option>
        </select>
      </div>

      {/* Tabla de consumos */}
      <table className="consulta-tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Placa</th>
            <th>Servicio</th>
            <th>Precio ($)</th>
          </tr>
        </thead>
        <tbody>
          {consumosFiltrados.length > 0 ? (
            consumosFiltrados.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.cliente}</td>
                <td>{c.placa}</td>
                <td>{c.servicio}</td>
                <td>${c.precio}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No se encontraron consumos.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Total gastado por cliente */}
      <h3>💰 Total de Gastos por Cliente</h3>
      <ul>
        {Object.entries(calcularTotal()).map(([cliente, total]) => (
          <li key={cliente}>
            {cliente}: ${total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Consulta;
