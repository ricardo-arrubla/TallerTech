import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./Facturacion.css";

const Facturacion = () => {
  // Lista de clientes y vehículos (simulados)
  const clientes = [
    { id: "001", nombre: "Juan Pérez", vehiculo: "Toyota Corolla - ABC123" },
    { id: "002", nombre: "María García", vehiculo: "Honda Civic - XYZ789" },
    { id: "003", nombre: "Carlos López", vehiculo: "Ford Focus - LMN456" },
  ];

  // Lista de servicios con precios
  const serviciosDisponibles = [
    { nombre: "Cambio de Aceite", precio: 30 },
    { nombre: "Alineación y Balanceo", precio: 50 },
    { nombre: "Cambio de Filtros", precio: 40 },
    { nombre: "Revisión General", precio: 80 },
    { nombre: "Cambio de Batería", precio: 100 },
  ];

  // Estados
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState("");
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
  const [numFactura, setNumFactura] = useState("001");
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);

  // Agregar servicio a la factura
  const agregarServicio = (servicio) => {
    setServiciosSeleccionados([...serviciosSeleccionados, servicio]);
  };

  // Eliminar servicio de la factura
  const eliminarServicio = (index) => {
    setServiciosSeleccionados(serviciosSeleccionados.filter((_, i) => i !== index));
  };

  // Calcular total
  const subtotal = serviciosSeleccionados.reduce((sum, servicio) => sum + servicio.precio, 0);
  const impuestos = subtotal * 0.16;
  const total = subtotal + impuestos;

  // Generar PDF
  const generarPDF = () => {
    if (!clienteSeleccionado || !vehiculoSeleccionado || serviciosSeleccionados.length === 0) {
      alert("Por favor, complete todos los campos antes de generar la factura.");
      return;
    }

    const doc = new jsPDF();
    doc.text("Factura de Servicios", 14, 10);
    doc.text(`Factura No: ${numFactura}`, 14, 20);
    doc.text(`Fecha: ${fecha}`, 14, 30);
    doc.text(`Cliente: ${clienteSeleccionado}`, 14, 40);
    doc.text(`Vehículo: ${vehiculoSeleccionado}`, 14, 50);
    
    doc.autoTable({
      startY: 60,
      head: [["Servicio", "Precio ($)"]],
      body: serviciosSeleccionados.map((servicio) => [servicio.nombre, `$${servicio.precio}`]),
    });

    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 10);
    doc.text(`Impuestos (16%): $${impuestos.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 20);
    doc.text(`Total: $${total.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 30);

    doc.save(`Factura_${numFactura}.pdf`);
  };

  return (
    <div className="facturacion-container">
      <h2>🧾 Generar Factura</h2>
      <p>Seleccione un cliente, los servicios realizados y genere la factura.</p>

      {/* Selección de Cliente y Vehículo */}
      <div className="seleccion">
        <label>👤 Cliente:</label>
        <select onChange={(e) => setClienteSeleccionado(e.target.value)}>
          <option value="">Seleccione Cliente</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.nombre}>{c.nombre}</option>
          ))}
        </select>

        <label>🚗 Vehículo:</label>
        <select onChange={(e) => setVehiculoSeleccionado(e.target.value)}>
          <option value="">Seleccione Vehículo</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.vehiculo}>{c.vehiculo}</option>
          ))}
        </select>
      </div>

      {/* Selección de Servicios */}
      <div className="servicios-lista">
        <h3>📌 Seleccionar Servicios</h3>
        {serviciosDisponibles.map((servicio, index) => (
          <button key={index} onClick={() => agregarServicio(servicio)}>
            ➕ {servicio.nombre} - ${servicio.precio}
          </button>
        ))}
      </div>

      {/* Tabla de Factura */}
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

      {/* Resumen de Factura */}
      <h3>💰 Total a Pagar</h3>
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Impuestos (16%): ${impuestos.toFixed(2)}</p>
      <p><strong>Total: ${total.toFixed(2)}</strong></p>

      {/* Botón para generar factura */}
      <button className="factura-btn" onClick={generarPDF}>📄 Generar Factura</button>
    </div>
  );
};

export default Facturacion;
