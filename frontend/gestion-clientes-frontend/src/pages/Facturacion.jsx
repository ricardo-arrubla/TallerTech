import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./Facturacion.css";

const Facturacion = () => {
  // Lista de servicios con precios
  const serviciosDisponibles = [
    { nombre: "Cambio de Aceite", precio: 30 },
    { nombre: "Alineación y Balanceo", precio: 50 },
    { nombre: "Cambio de Filtros", precio: 40 },
    { nombre: "Revisión General", precio: 80 },
    { nombre: "Cambio de Batería", precio: 100 },
  ];

  // Estado de los servicios seleccionados
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);

  // Agregar servicio a la factura
  const agregarServicio = (servicio) => {
    setServiciosSeleccionados([...serviciosSeleccionados, servicio]);
  };

  // Eliminar servicio de la factura
  const eliminarServicio = (index) => {
    setServiciosSeleccionados(serviciosSeleccionados.filter((_, i) => i !== index));
  };

  // Calcular total
  const total = serviciosSeleccionados.reduce((sum, servicio) => sum + servicio.precio, 0);

  // Generar PDF
  const generarPDF = () => {
    const doc = new jsPDF();
    doc.text("Factura de Servicios", 14, 10);
    doc.autoTable({
      head: [["Servicio", "Precio ($)"]],
      body: serviciosSeleccionados.map((servicio) => [servicio.nombre, `$${servicio.precio}`]),
    });
    doc.text(`Total: $${total}`, 14, doc.autoTable.previous.finalY + 10);
    doc.save("factura_servicio.pdf");
  };

  return (
    <div className="facturacion-container">
      <h2>🧾 Facturación de Servicios</h2>

      <div className="servicios-lista">
        <h3>📌 Seleccionar Servicios</h3>
        {serviciosDisponibles.map((servicio, index) => (
          <button key={index} onClick={() => agregarServicio(servicio)}>
            ➕ {servicio.nombre} - ${servicio.precio}
          </button>
        ))}
      </div>

      <h3>🛠 Servicios Seleccionados</h3>
      <table>
        <thead>
          <tr>
            <th>Servicio</th>
            <th>Precio ($)</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {serviciosSeleccionados.length > 0 ? (
            serviciosSeleccionados.map((servicio, index) => (
              <tr key={index}>
                <td>{servicio.nombre}</td>
                <td>${servicio.precio}</td>
                <td>
                  <button className="eliminar-btn" onClick={() => eliminarServicio(index)}>❌</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No hay servicios seleccionados.</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>💰 Total: ${total}</h3>
      <button className="factura-btn" onClick={generarPDF}>📄 Generar Factura</button>
    </div>
  );
};

export default Facturacion;
