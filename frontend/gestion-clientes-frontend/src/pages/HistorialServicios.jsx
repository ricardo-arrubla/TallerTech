import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./Estilos/HistorialServicios.css";

const HistorialServicios = () => {
  // Cargar datos desde localStorage
  const [historial, setHistorial] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [detalleVehiculo, setDetalleVehiculo] = useState(null);

  useEffect(() => {
    const serviciosGuardados = JSON.parse(localStorage.getItem("historialServicios")) || [];
    setHistorial(serviciosGuardados);
  }, []);

  // Filtrar servicios por cliente o placa
  const handleSearch = (e) => {
    const valor = e.target.value.toLowerCase();
    setFiltro(valor);

    if (valor === "") {
      setHistorial(JSON.parse(localStorage.getItem("historialServicios")) || []);
    } else {
      setHistorial(
        (JSON.parse(localStorage.getItem("historialServicios")) || []).filter(
          (servicio) =>
            servicio.cliente.toLowerCase().includes(valor) ||
            servicio.placa.toLowerCase().includes(valor)
        )
      );
    }
  };

  // Ver detalles del vehículo
  const verDetalles = (placa) => {
    // Cargar inspecciones y facturas asociadas al vehículo
    const inspecciones = JSON.parse(localStorage.getItem("inspecciones")) || {};
    const facturas = JSON.parse(localStorage.getItem("facturas")) || {};
    const historialServicios = JSON.parse(localStorage.getItem("historialServicios")) || [];

    setDetalleVehiculo({
      placa,
      inspecciones: inspecciones[placa] || [],
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
    doc.text("Historial Completo del Vehículo", 14, 10);

    historial.forEach((servicio, index) => {
      doc.text(`Cliente: ${servicio.cliente}`, 14, 20 + index * 10);
      doc.text(`Placa: ${servicio.placa}`, 14, 25 + index * 10);
      doc.text(`Fecha: ${servicio.fecha}`, 14, 30 + index * 10);
      doc.text(`Servicio: ${servicio.servicio}`, 14, 35 + index * 10);
      doc.text(`Costo: $${servicio.costo}`, 14, 40 + index * 10);
    });

    doc.save("historial_completo.pdf");
  };

  return (
    <div className="historial-container">
      <h2>📋 Historial de Servicios</h2>

      <input
        type="text"
        placeholder="Buscar por cliente o placa..."
        value={filtro}
        onChange={handleSearch}
      />

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

      <button onClick={exportarPDF}>📄 Exportar a PDF</button>

      {/* Modal de detalles del vehículo */}
      {detalleVehiculo && (
        <div className="modal-detalle">
          <div className="detalle-content">
            <h3>📖 Historial Completo del Vehículo</h3>
            <p>🚗 Placa: {detalleVehiculo.placa}</p>

            <h4>🔍 Inspecciones Previas</h4>
            {detalleVehiculo.inspecciones.length > 0 ? (
              <ul>
                {detalleVehiculo.inspecciones.map((insp, index) => (
                  <li key={index}>
                    {insp.fecha} - {insp.estado}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay inspecciones registradas.</p>
            )}

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
