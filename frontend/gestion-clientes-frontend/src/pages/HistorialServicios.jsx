import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./Estilos/HistorialServicios.css";

const HistorialServicios = () => {
  // Datos simulados de servicios
  const datosServicios = [
    { id: 1, cliente: "Juan Pérez", placa: "ABC123", fecha: "2024-02-15", servicio: "Cambio de aceite", costo: 30 },
    { id: 2, cliente: "Ana García", placa: "XYZ789", fecha: "2024-02-20", servicio: "Alineación de ruedas", costo: 50 },
    { id: 3, cliente: "Carlos López", placa: "LMN456", fecha: "2024-02-25", servicio: "Cambio de frenos", costo: 120 },
    { id: 4, cliente: "Juan Pérez", placa: "ABC123", fecha: "2024-03-05", servicio: "Revisión general", costo: 80 },
  ];

  const [filtro, setFiltro] = useState("");
  const [resultados, setResultados] = useState(datosServicios);

  // Filtrar servicios por ID del cliente o placa
  const handleSearch = (e) => {
    const valor = e.target.value.toLowerCase();
    setFiltro(valor);

    if (valor === "") {
      setResultados(datosServicios);
    } else {
      setResultados(
        datosServicios.filter(
          (servicio) =>
            servicio.cliente.toLowerCase().includes(valor) ||
            servicio.placa.toLowerCase().includes(valor)
        )
      );
    }
  };

  // Exportar a PDF
  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text("Historial de Servicios", 14, 10);
    doc.autoTable({
      head: [["Cliente", "Placa", "Fecha", "Servicio", "Costo ($)"]],
      body: resultados.map(({ cliente, placa, fecha, servicio, costo }) => [
        cliente,
        placa,
        fecha,
        servicio,
        `$${costo}`,
      ]),
    });
    doc.save("historial_servicios.pdf");
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
          </tr>
        </thead>
        <tbody>
          {resultados.map((servicio, index) => (
            <tr key={index}>
              <td>{servicio.cliente}</td>
              <td>{servicio.placa}</td>
              <td>{servicio.fecha}</td>
              <td>{servicio.servicio}</td>
              <td>${servicio.costo}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={exportarPDF}>📄 Exportar a PDF</button>
    </div>
  );
};

export default HistorialServicios;
