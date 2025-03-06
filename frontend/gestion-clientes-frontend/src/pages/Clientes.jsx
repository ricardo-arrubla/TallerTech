import { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./Clientes.css";

const Clientes = () => {
  // Datos de clientes (Simulados)
  const [clientes, setClientes] = useState([
    { id: "001", nombre: "Juan Pérez", telefono: "123-456-7890", correo: "juan@example.com", vehiculos: 2, estado: "Activo" },
    { id: "002", nombre: "María García", telefono: "987-654-3210", correo: "maria@example.com", vehiculos: 1, estado: "Inactivo" },
    { id: "003", nombre: "Carlos López", telefono: "456-789-0123", correo: "carlos@example.com", vehiculos: 3, estado: "Activo" },
  ]);

  // Estados de búsqueda y filtros
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("nombre");
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");

  // Estados del modal de edición
  const [modalAbierto, setModalAbierto] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);

  // Estado para mostrar detalles del cliente
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  // Filtrar clientes
  const clientesFiltrados = clientes.filter((c) =>
    c[filtro].toLowerCase().includes(busqueda.toLowerCase()) &&
    (estadoFiltro === "Todos" || c.estado === estadoFiltro)
  );

  // Abrir modal con datos del cliente seleccionado
  const abrirModalEdicion = (cliente) => {
    setClienteEditando(cliente);
    setModalAbierto(true);
  };

  // Guardar cambios del modal
  const guardarEdicion = () => {
    setClientes(clientes.map(c => (c.id === clienteEditando.id ? clienteEditando : c)));
    setModalAbierto(false);
  };

  // Manejar cambios en el input del modal
  const handleChange = (e) => {
    setClienteEditando({ ...clienteEditando, [e.target.name]: e.target.value });
  };

  // Eliminar cliente
  const eliminarCliente = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este cliente?")) {
      setClientes(clientes.filter((c) => c.id !== id));
    }
  };

  // Mostrar detalles del cliente
  const verDetallesCliente = (cliente) => {
    setClienteSeleccionado(cliente);
  };

  // Cerrar el modal de detalles
  const cerrarDetalles = () => {
    setClienteSeleccionado(null);
  };

  // Datos para el gráfico de clientes activos e inactivos
  const dataClientes = {
    labels: ["Activos", "Inactivos"],
    datasets: [
      {
        label: "Cantidad de Clientes",
        data: [
          clientes.filter((c) => c.estado === "Activo").length,
          clientes.filter((c) => c.estado === "Inactivo").length,
        ],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };

  return (
    <div className="clientes-container">
      <h2>📋 Gestión de Clientes</h2>
      <p>Administra la lista de clientes, filtra por estado o realiza acciones en cada uno.</p>

      {/* Barra de búsqueda y filtros */}
      <div className="busqueda-container">
        <input
          type="text"
          placeholder={`Buscar por ${filtro}...`}
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <select onChange={(e) => setFiltro(e.target.value)}>
          <option value="nombre">Nombre</option>
          <option value="telefono">Teléfono</option>
          <option value="correo">Correo</option>
        </select>
        <select onChange={(e) => setEstadoFiltro(e.target.value)}>
          <option value="Todos">Todos</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>

      {/* Tabla de clientes */}
      <table className="clientes-tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Vehículos</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.length > 0 ? (
            clientesFiltrados.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.nombre}</td>
                <td>{c.telefono}</td>
                <td>{c.correo}</td>
                <td>{c.vehiculos}</td>
                <td className={`estado ${c.estado.toLowerCase()}`}>{c.estado}</td>
                <td>
                  <button className="btn-ver" onClick={() => verDetallesCliente(c)}>👁 Ver</button>
                  <button className="btn-editar" onClick={() => abrirModalEdicion(c)}>✏ Editar</button>
                  <button className="btn-eliminar" onClick={() => eliminarCliente(c.id)}>🗑 Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No se encontraron clientes.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Gráfico de clientes activos vs. inactivos */}
      <h3>📈 Estado de Clientes</h3>
      <div className="grafico-container">
        <Bar data={dataClientes} />
      </div>

      {/* Modal de Edición */}
      {modalAbierto && (
        <div className="modal">
          <div className="modal-content">
            <h3>✏️ Editar Cliente</h3>
            <label>Nombre:</label>
            <input type="text" name="nombre" value={clienteEditando.nombre} onChange={handleChange} />

            <label>Teléfono:</label>
            <input type="text" name="telefono" value={clienteEditando.telefono} onChange={handleChange} />

            <label>Correo:</label>
            <input type="email" name="correo" value={clienteEditando.correo} onChange={handleChange} />

            <label>Estado:</label>
            <select name="estado" value={clienteEditando.estado} onChange={handleChange}>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>

            <button className="guardar-btn" onClick={guardarEdicion}>💾 Guardar Cambios</button>
            <button className="cerrar-btn" onClick={() => setModalAbierto(false)}>❌ Cancelar</button>
          </div>
        </div>
      )}

      {/* Modal de Detalles del Cliente */}
      {clienteSeleccionado && (
        <div className="modal">
          <div className="modal-content">
            <h3>👤 Detalles del Cliente</h3>
            <p><strong>ID:</strong> {clienteSeleccionado.id}</p>
            <p><strong>Nombre:</strong> {clienteSeleccionado.nombre}</p>
            <p><strong>Teléfono:</strong> {clienteSeleccionado.telefono}</p>
            <p><strong>Correo:</strong> {clienteSeleccionado.correo}</p>
            <p><strong>Vehículos:</strong> {clienteSeleccionado.vehiculos}</p>
            <p><strong>Estado:</strong> {clienteSeleccionado.estado}</p>
            <button className="cerrar-btn" onClick={cerrarDetalles}>❌ Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;