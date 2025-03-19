import { useState, useEffect } from "react";
import "./Estilos/RegistroVehiculo.css";
import FormularioRegistro from "./FormularioRegistro";

const RegistroVehiculo = () => {
  const [clientesRegistrados, setClientesRegistrados] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [nuevoCliente, setNuevoCliente] = useState("");

  // Cargar clientes desde localStorage
  useEffect(() => {
    const clientesGuardados = JSON.parse(localStorage.getItem("clientes")) || [];
    setClientesRegistrados(clientesGuardados);
  }, []);

  const handleClienteChange = (e) => {
    const value = e.target.value;
    if (value === "nuevo") {
      setClienteSeleccionado("");
    } else {
      setClienteSeleccionado(value);
      setNuevoCliente(""); // Resetear campo manual si elige uno existente
    }
  };

  const handleSubmit = (data) => {
    let clienteFinal;

    if (clienteSeleccionado !== "") {
      clienteFinal = clienteSeleccionado;
    } else if (nuevoCliente !== "") {
      // Crear un nuevo cliente
      const nuevoId = nuevoCliente;
      const clientesGuardados = JSON.parse(localStorage.getItem("clientes")) || [];

      if (clientesGuardados.some((cliente) => cliente.id === nuevoId)) {
        alert("El ID ya está registrado. Por favor, use otro.");
        return;
      }

      clientesGuardados.push({ id: nuevoId, nombre: nuevoId });
      localStorage.setItem("clientes", JSON.stringify(clientesGuardados));
      clienteFinal = nuevoId;
    } else {
      alert("Por favor, seleccione un cliente existente o ingrese un nuevo ID.");
      return;
    }

    // Guardar el vehículo
    const vehiculosGuardados = JSON.parse(localStorage.getItem("vehiculos")) || [];
    vehiculosGuardados.push({ ...data, clienteId: clienteFinal });
    localStorage.setItem("vehiculos", JSON.stringify(vehiculosGuardados));

    alert(`Vehículo registrado con éxito para el cliente ID: ${clienteFinal}`);
  };

  const renderExtraFields = () => (
    <div className="cliente-seleccion">
      <label>ID Cliente:</label>
      <select name="clienteId" value={clienteSeleccionado} onChange={handleClienteChange} required>
        <option value="">Seleccione un cliente</option>
        {clientesRegistrados.map((cliente) => (
          <option key={cliente.id} value={cliente.id}>
            {cliente.nombre} (ID: {cliente.id})
          </option>
        ))}
        <option value="nuevo">Registrar nuevo cliente</option>
      </select>
      {clienteSeleccionado === "" && (
        <input
          type="text"
          placeholder="Ingrese ID del nuevo cliente"
          value={nuevoCliente}
          onChange={(e) => setNuevoCliente(e.target.value)}
          required
        />
      )}
    </div>
  );

  return (
    <FormularioRegistro
      tipo="Registro de Vehículo"
      campos={[
        { name: "placa", label: "Placa", type: "text", placeholder: "Ingrese la placa" },
        { name: "marca", label: "Marca", type: "select", defaultValue: "Chevrolet" },
        { name: "modelo", label: "Modelo", type: "text", placeholder: "Ingrese el modelo" },
        { name: "anio", label: "Año", type: "number", placeholder: "Ingrese el año" },
      ]}
      opciones={{
        marca: ["Chevrolet", "Tesla", "Toyota", "Ford", "Honda", "BMW", "Mercedes-Benz", "Audi"],
      }}
      extraFields={renderExtraFields}
      onSubmit={handleSubmit}
    />
  );
};

export default RegistroVehiculo;