import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./Estilos/Facturacion.css";

const Facturacion = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [vehiculosCliente, setVehiculosCliente] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState("");
  const [serviciosAuto, setServiciosAuto] = useState([]); // Servicios de inspección/diagnóstico
  const [serviciosManuales, setServiciosManuales] = useState([]); // Servicios añadidos
  const [numFactura, setNumFactura] = useState("001");
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);

  // 📌 Servicios predefinidos en el taller
  const serviciosDisponibles = [
    { nombre: "Cambio de Aceite", precio: 30 },
    { nombre: "Alineación y Balanceo", precio: 50 },
    { nombre: "Cambio de Filtros", precio: 40 },
    { nombre: "Revisión General", precio: 80 },
    { nombre: "Cambio de Batería", precio: 100 },
    { nombre: "Cambio de Pastillas de Freno", precio: 90 },
    { nombre: "Diagnóstico Computarizado", precio: 60 },
    { nombre: "Reparación de Suspensión", precio: 120 },
  ];

  // 📌 Cargar clientes y sus vehículos desde `localStorage`
  useEffect(() => {
    const clientesGuardados = JSON.parse(localStorage.getItem("clientes")) || [];
    setClientes(clientesGuardados);
  }, []);

  // 🚗 Cargar vehículos del cliente seleccionado
  const seleccionarCliente = (idCliente) => {
    setClienteSeleccionado(idCliente);
    const cliente = clientes.find((c) => c.id === idCliente);
    setVehiculosCliente(cliente?.vehiculos || []);
    setVehiculoSeleccionado(""); // Resetear selección
  };

  // 🔍 Buscar inspección y diagnóstico del vehículo seleccionado
  const seleccionarVehiculo = (placa) => {
    setVehiculoSeleccionado(placa);

    const inspecciones = JSON.parse(localStorage.getItem("inspecciones")) || {};
    const diagnosticos = JSON.parse(localStorage.getItem("diagnosticos")) || {};

    const inspeccion = inspecciones[placa] || {};
    const diagnostico = diagnosticos[placa] || {};

    // Convertir datos de inspección y diagnóstico en servicios facturables
    const serviciosDetectados = [];

    Object.entries(inspeccion).forEach(([parte, estado]) => {
      if (estado !== "normal") {
        serviciosDetectados.push({ nombre: `Revisión de ${parte}`, precio: 25 });
      }
    });

    Object.entries(diagnostico).forEach(([componente, estado]) => {
      if (estado === "Falla") {
        serviciosDetectados.push({ nombre: `Reparación de ${componente}`, precio: 80 });
      } else if (estado === "Desgastados") {
        serviciosDetectados.push({ nombre: `Cambio de ${componente}`, precio: 50 });
      }
    });

    setServiciosAuto(serviciosDetectados);
    setServiciosManuales([]); // Resetear servicios añadidos manualmente
  };

  // 🛠 Añadir servicios predefinidos con un clic
  const agregarServicioPredefinido = (servicio) => {
    if (!serviciosManuales.some((s) => s.nombre === servicio.nombre)) {
      setServiciosManuales([...serviciosManuales, servicio]);
    }
  };

  // 📝 Añadir servicios manuales
  const agregarServicioManual = () => {
    const nombre = prompt("Ingrese el nombre del servicio:");
    const precio = parseFloat(prompt("Ingrese el precio del servicio:"));

    if (nombre && !isNaN(precio)) {
      setServiciosManuales([...serviciosManuales, { nombre, precio }]);
    }
  };

  // ❌ Eliminar servicio añadido
  const eliminarServicio = (index) => {
    setServiciosManuales(serviciosManuales.filter((_, i) => i !== index));
  };

  // 💰 Calcular totales
  const subtotal = [...serviciosAuto, ...serviciosManuales].reduce((sum, s) => sum + s.precio, 0);
  const impuestos = subtotal * 0.16;
  const total = subtotal + impuestos;

  // 📄 Generar factura en PDF
  const generarPDF = () => {
    if (!clienteSeleccionado || !vehiculoSeleccionado) {
      alert("Debe seleccionar un cliente y un vehículo.");
      return;
    }

    const doc = new jsPDF();

    // 🔹 Encabezado
    doc.setFontSize(18);
    doc.text("TallerTech - Factura de Servicios", 14, 10);

    doc.setFontSize(12);
    doc.text(`Factura No: ${numFactura}`, 14, 20);
    doc.text(`Fecha: ${fecha}`, 14, 30);
    doc.text(`Cliente: ${clienteSeleccionado}`, 14, 40);
    doc.text(`Vehículo: ${vehiculoSeleccionado}`, 14, 50);

    // 🛠 Lista de servicios
    doc.autoTable({
      startY: 60,
      head: [["Servicio", "Precio ($)"]],
      body: [...serviciosAuto, ...serviciosManuales].map((s) => [s.nombre, `$${s.precio}`]),
    });

    // 💰 Totales
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 10);
    doc.text(`Impuestos (16%): $${impuestos.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 20);
    doc.text(`Total: $${total.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 30);

    // Guardar PDF
    try {
      doc.save(`Factura_${numFactura}.pdf`);
      alert("✅ Factura generada correctamente.");
    } catch (error) {
      console.error("Error al generar PDF:", error);
      alert("❌ Ocurrió un error al generar la factura.");
    }
  };

  return (
    <div className="facturacion-container">
      <h2>🧾 Facturación de Servicios</h2>

      {/* 📌 Selección de Cliente y Vehículo */}
      <div className="seleccion">
        <label>👤 Cliente:</label>
        <select onChange={(e) => seleccionarCliente(e.target.value)}>
          <option value="">Seleccione Cliente</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>

        <label>🚗 Vehículo:</label>
        <select onChange={(e) => seleccionarVehiculo(e.target.value)} disabled={!clienteSeleccionado}>
          <option value="">Seleccione Vehículo</option>
          {vehiculosCliente.map((v, index) => (
            <option key={index} value={v.placa}>{v.marca} - {v.placa}</option>
          ))}
        </select>
      </div>

      {/* 📌 Servicios Predefinidos */}
      <h3>🔧 Servicios Disponibles</h3>
      <div className="servicios-disponibles">
        {serviciosDisponibles.map((servicio, index) => (
          <button key={index} onClick={() => agregarServicioPredefinido(servicio)}>
            ➕ {servicio.nombre} - ${servicio.precio}
          </button>
        ))}
      </div>

      {/* 🛠 Lista de Servicios Facturados */}
      <h3>🔧 Servicios Facturados</h3>
      <ul>
        {[...serviciosAuto, ...serviciosManuales].map((s, index) => (
          <li key={index}>{s.nombre} - ${s.precio} {index >= serviciosAuto.length && <button onClick={() => eliminarServicio(index)}>❌</button>}</li>
        ))}
      </ul>
      <button onClick={agregarServicioManual}>➕ Añadir Servicio Manual</button>

      {/* 💳 Generar Factura */}
      <h3>💰 Total: ${total.toFixed(2)}</h3>
      <button onClick={generarPDF}>📄 Generar Factura</button>
    </div>
  );
};

export default Facturacion;
