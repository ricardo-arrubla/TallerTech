import { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./Consulta.css";

const Consulta = () => {
  // Datos de consumos (Simulados)
  const [consumos, setConsumos] = useState([
    { id: "001", cliente: "Juan Pérez", placa: "ABC123", servicio: "Cambio de Aceite", precio: 30, fecha: "2023-10-10", estado: "Completado" },
    { id: "002", cliente: "María García", placa: "XYZ789", servicio: "Alineación y Balanceo", precio: 50, fecha: "2023-10-15", estado: "Pendiente" },
    { id: "003", cliente: "Carlos López", placa: "LMN456", servicio: "Cambio de Filtros", precio: 40, fecha: "2023-09-28", estado: "Cancelado" },
    { id: "004", cliente: "Juan Pérez", placa: "ABC123", servicio: "Revisión General", precio: 80, fecha: "2023-10-20", estado: "Completado" },
  ]);

  // Estado para la búsqueda y filtros
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("cliente");
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");

  // Estado para el modal de edición
  const [modalVisible, setModalVisible] = useState(false);
  const [consumoEditando, setConsumoEditando] = useState(null);

  // Filtrar consumos según búsqueda y estado
  const consumosFiltrados = consumos.filter((c) => 
    c[filtro].toLowerCase().includes(busqueda.toLowerCase()) &&
    (estadoFiltro === "Todos" || c.estado === estadoFiltro)
  );

  // Función para ver detalles de un consumo
  const handleVer = (consumo) => {
    alert(`Detalles del consumo:\n\nCliente: ${consumo.cliente}\nPlaca: ${consumo.placa}\nServicio: ${consumo.servicio}\nFecha: ${consumo.fecha}\nEstado: ${consumo.estado}\nPrecio: $${consumo.precio}`);
  };

  // Función para abrir el modal de edición
  const handleEditar = (id) => {
    const consumoSeleccionado = consumos.find((c) => c.id === id);
    setConsumoEditando(consumoSeleccionado);
    setModalVisible(true);
  };

  // Función para eliminar un consumo
  const handleEliminar = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este consumo?")) {
      setConsumos(consumos.filter((c) => c.id !== id));
    }
  };

  // Función para guardar los cambios del consumo editado
  const handleGuardarCambios = () => {
    setConsumos((prevConsumos) =>
      prevConsumos.map((c) =>
        c.id === consumoEditando.id ? consumoEditando : c
      )
    );
    setModalVisible(false); // Cerrar el modal después de guardar
  };

  // Calcular total de gastos por cliente
  const calcularTotal = () => {
    let totalPorCliente = {};
    consumos.forEach((c) => {
      totalPorCliente[c.cliente] = (totalPorCliente[c.cliente] || 0) + c.precio;
    });
    return totalPorCliente;
  };

  // Datos para la gráfica de gastos por cliente
  const dataGastos = {
    labels: Object.keys(calcularTotal()),
    datasets: [
      {
        label: "Total Gastado ($)",
        data: Object.values(calcularTotal()),
        backgroundColor: ["#8b0000", "#f39c12", "#3498db"],
      },
    ],
  };

  return (
    <div className="consulta-container">
      <h2>📊 Consulta de Consumos</h2>
      <p>Revisa el historial de consumos y servicios realizados en el taller.</p>

      {/* Barra de búsqueda y filtros */}
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
        <select onChange={(e) => setEstadoFiltro(e.target.value)}>
          <option value="Todos">Todos</option>
          <option value="Completado">Completado</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Cancelado">Cancelado</option>
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
            <th>Fecha</th>
            <th>Estado</th>
            <th>Precio ($)</th>
            <th>Acciones</th>
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
                <td>{c.fecha}</td>
                <td className={`estado ${c.estado.toLowerCase()}`}>{c.estado}</td>
                <td>${c.precio}</td>
                <td>
                  <button className="btn-ver" onClick={() => handleVer(c)}>👁 Ver</button>
                  <button className="btn-editar" onClick={() => handleEditar(c.id)}>✏ Editar</button>
                  <button className="btn-eliminar" onClick={() => handleEliminar(c.id)}>🗑 Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No se encontraron consumos.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal de edición */}
      {modalVisible && consumoEditando && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Editar Consumo</h3>
            <form>
              <label>
                Cliente:
                <input
                  type="text"
                  value={consumoEditando.cliente}
                  onChange={(e) =>
                    setConsumoEditando({ ...consumoEditando, cliente: e.target.value })
                  }
                />
              </label>
              <label>
                Placa:
                <input
                  type="text"
                  value={consumoEditando.placa}
                  onChange={(e) =>
                    setConsumoEditando({ ...consumoEditando, placa: e.target.value })
                  }
                />
              </label>
              <label>
                Servicio:
                <input
                  type="text"
                  value={consumoEditando.servicio}
                  onChange={(e) =>
                    setConsumoEditando({ ...consumoEditando, servicio: e.target.value })
                  }
                />
              </label>
              <label>
                Precio:
                <input
                  type="number"
                  value={consumoEditando.precio}
                  onChange={(e) =>
                    setConsumoEditando({ ...consumoEditando, precio: Number(e.target.value) })
                  }
                />
              </label>
              <label>
                Fecha:
                <input
                  type="date"
                  value={consumoEditando.fecha}
                  onChange={(e) =>
                    setConsumoEditando({ ...consumoEditando, fecha: e.target.value })
                  }
                />
              </label>
              <label>
                Estado:
                <select
                  value={consumoEditando.estado}
                  onChange={(e) =>
                    setConsumoEditando({ ...consumoEditando, estado: e.target.value })
                  }
                >
                  <option value="Completado">Completado</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </label>
              <div className="modal-actions">
                <button type="button" onClick={() => setModalVisible(false)}>
                  Cancelar
                </button>
                <button type="button" onClick={handleGuardarCambios}>
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gráfico de gastos por cliente */}
      <h3>📈 Gastos por Cliente</h3>
      <div className="grafico-container">
        <Bar data={dataGastos} />
      </div>
    </div>
  );
};

export default Consulta;