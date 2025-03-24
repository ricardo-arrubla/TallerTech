import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./Estilos/HistorialServicios.css";

const HistorialServicios = () => {
  // Estados
  const [historial, setHistorial] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [detalleVehiculo, setDetalleVehiculo] = useState(null);

  // Cargar datos desde localStorage
  useEffect(() => {
    const serviciosGuardados = JSON.parse(localStorage.getItem("historialServicios")) || [];
    setHistorial(serviciosGuardados);
  }, []);

  // Búsqueda con debounce
  useEffect(() => {
    let timeout;
    if (filtro.trim() !== "") {
      timeout = setTimeout(() => {
        const serviciosGuardados = JSON.parse(localStorage.getItem("historialServicios")) || [];
        const filtrado = serviciosGuardados.filter(
          (servicio) =>
            servicio.cliente.toLowerCase().includes(filtro.toLowerCase()) ||
            servicio.placa.toLowerCase().includes(filtro.toLowerCase())
        );
        setHistorial(filtrado);
      }, 300); // Debounce de 300ms
    } else {
      const serviciosGuardados = JSON.parse(localStorage.getItem("historialServicios")) || [];
      setHistorial(serviciosGuardados);
    }

    return () => clearTimeout(timeout);
  }, [filtro]);

  // Ver detalles del vehículo
  const verDetalles = (placa) => {
    // Cargar inspecciones y facturas asociadas al vehículo
    const inspecciones = JSON.parse(localStorage.getItem("inspecciones")) || {};
    const facturas = JSON.parse(localStorage.getItem("facturas")) || {};
    const historialServicios = JSON.parse(localStorage.getItem("historialServicios")) || [];

    setDetalleVehiculo({
      placa,
      inspecciones: inspecciones[placa] || {},
      servicios: historialServicios.filter((s) => s.placa === placa),
      facturas: facturas[placa] || [],
    });
  };

  // Cerrar detalles
  const cerrarDetalles = () => {
    setDetalleVehiculo(null);
  };

  // Exportar historial completo a PDF
  const exportarPDF = () => {
    const doc = new jsPDF();

    // Uso de autoTable para mejorar el formato
    doc.autoTable({
      head: [["Cliente", "Placa", "Fecha", "Servicio", "Costo"]],
      body: historial.map((servicio) => [
        servicio.cliente,
        servicio.placa,
        servicio.fecha,
        servicio.servicio,
        `$${servicio.costo}`,
      ]),
    });

    doc.save("historial_completo.pdf");
  };

  return (
    <div className="historial-container">
      <h2>📋 Historial de Servicios</h2>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por cliente o placa..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      {/* Tabla de historial */}
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Placa</th>
            <th>Fecha</th>
            <th>Servicio</th>
            <th>Costo ($)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {historial.map((servicio, index) => (
            <tr key={index}>
              <td>{servicio.cliente}</td>
              <td>{servicio.placa}</td>
              <td>{servicio.fecha}</td>
              <td>{servicio.servicio}</td>
              <td>${servicio.costo}</td>
              <td>
                <button className="detalle-btn" onClick={() => verDetalles(servicio.placa)}>
                  🔍 Ver Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón para exportar PDF */}
      <button onClick={exportarPDF}>📄 Exportar a PDF</button>

      {/* Modal de detalles del vehículo */}
      {detalleVehiculo && (
        <div className="modal-detalle">
          <div className="detalle-content">
            <h3>📖 Historial Completo del Vehículo</h3>
            <p>🚗 Placa: {detalleVehiculo.placa}</p>

            {/* Inspecciones previas */}
            <h4>🔍 Inspecciones Previas</h4>
            {Object.keys(detalleVehiculo.inspecciones).length > 0 ? (
              <ul>
                {Object.entries(detalleVehiculo.inspecciones).map(([parte, estado], index) => (
                  <li key={index}>
                    {parte}: {estado}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay inspecciones registradas.</p>
            )}

            {/* Servicios realizados */}
            <h4>🛠 Servicios Realizados</h4>
            {detalleVehiculo.servicios.length > 0 ? (
              <ul>
                {detalleVehiculo.servicios.map((serv, index) => (
                  <li key={index}>
                    {serv.fecha} - {serv.servicio} (${serv.costo})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay servicios registrados.</p>
            )}

            {/* Facturación asociada */}
            <h4>🧾 Facturación Asociada</h4>
            {detalleVehiculo.facturas.length > 0 ? (
              <ul>
                {detalleVehiculo.facturas.map((fact, index) => (
                  <li key={index}>
                    {fact.fecha} - Factura #{fact.numFactura} - Total: ${fact.total}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay facturas registradas.</p>
            )}

            {/* Botón para cerrar el modal */}
            <button className="cerrar-btn" onClick={cerrarDetalles}>
              ❌ Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistorialServicios;