import { useState, useEffect } from "react";
import "./Clientes.css";

const Clientes = () => {
  // Estado de clientes
  const [clientes, setClientes] = useState([
    { id: "001", nombre: "Juan Pérez", placa: "ABC123", vehiculo: "Toyota Corolla" },
    { id: "002", nombre: "María García", placa: "XYZ789", vehiculo: "Honda Civic" },
    { id: "003", nombre: "Carlos López", placa: "LMN456", vehiculo: "Ford Focus" },
  ]);

  // Estados para el modal de edición
  const [modalAbierto, setModalAbierto] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);

  // Estado de búsqueda
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("nombre");

  // Filtrar clientes según la búsqueda
  const clientesFiltrados = clientes.filter((cliente) =>
    cliente[filtro].toLowerCase().includes(busqueda.toLowerCase())
  );

  // Abrir modal con los datos del cliente a editar
  const abrirModalEdicion = (cliente) => {
    setClienteEditando(cliente);
    setModalAbierto(true);
  };

  // Guardar los cambios
  const guardarEdicion = () => {
    setClientes(clientes.map(c => (c.id === clienteEditando.id ? clienteEditando : c)));
    setModalAbierto(false);
  };

  // Manejar cambios en los inputs del modal
  const handleChange = (e) => {
    setClienteEditando({ ...clienteEditando, [e.target.name]: e.target.value });
  };

  // Eliminar cliente
  const eliminarCliente = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este cliente?")) {
      setClientes(clientes.filter((cliente) => cliente.id !== id));
    }
  };

  return (
    <div className="clientes-container">
      <h2>📋 Lista de Clientes</h2>

      {/* Barra de búsqueda */}
      <div className="busqueda-container">
        <input
          type="text"
          placeholder={`Buscar por ${filtro}...`}
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <select onChange={(e) => setFiltro(e.target.value)}>
          <option value="nombre">Nombre</option>
          <option value="id">ID</option>
          <option value="placa">Placa</option>
          <option value="vehiculo">Vehículo</option>
        </select>
      </div>

      {/* Tabla de clientes */}
      <table className="clientes-tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Placa</th>
            <th>Vehículo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.length > 0 ? (
            clientesFiltrados.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.placa}</td>
                <td>{cliente.vehiculo}</td>
                <td>
                  <button className="editar-btn" onClick={() => abrirModalEdicion(cliente)}>✏️ Editar</button>
                  <button className="eliminar-btn" onClick={() => eliminarCliente(cliente.id)}>🗑️ Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No se encontraron clientes.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal de Edición */}
      {modalAbierto && (
        <div className="modal">
          <div className="modal-content">
            <h3>✏️ Editar Cliente</h3>
            <label>ID:</label>
            <input type="text" name="id" value={clienteEditando.id} readOnly />

            <label>Nombre:</label>
            <input type="text" name="nombre" value={clienteEditando.nombre} onChange={handleChange} />

            <label>Placa:</label>
            <input type="text" name="placa" value={clienteEditando.placa} onChange={handleChange} />

            <label>Vehículo:</label>
            <input type="text" name="vehiculo" value={clienteEditando.vehiculo} onChange={handleChange} />

            <button className="guardar-btn" onClick={guardarEdicion}>💾 Guardar Cambios</button>
            <button className="cerrar-btn" onClick={() => setModalAbierto(false)}>❌ Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;
