import { useState, useEffect } from "react";
import "./Estilos/RegistroVehiculo.css"; // Asegúrate de tener este archivo
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
    if (clienteSeleccionado === "" && nuevoCliente === "") {
      alert("Por favor, seleccione un cliente existente o ingrese un nuevo ID.");
      return;
    }

    const clienteFinal = clienteSeleccionado !== "" ? clienteSeleccionado : nuevoCliente;

    // Guardar el vehículo asociado al cliente
    console.log("Vehículo registrado:", { ...data, clienteId: clienteFinal });

    // Opcional: Guardar en localStorage o enviar al backend
    alert(`Vehículo registrado con éxito para el cliente ID: ${clienteFinal}`);
  };

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
      extraCampos={
        <div className="cliente-seleccion">
          <label>ID Cliente:</label>
          <select name="clienteId" value={clienteSeleccionado} onChange={handleClienteChange} required>
            <option value="">Seleccione un cliente</option>
            {clientesRegistrados.length > 0 ? (
              clientesRegistrados.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre} (ID: {cliente.id})
                </option>
              ))
            ) : (
              <option value="">No hay clientes registrados</option>
            )}
            <option value="nuevo">Registrar un nuevo cliente</option>
          </select>

          {clienteSeleccionado === "" && (
            <input
              type="text"
              name="nuevoCliente"
              value={nuevoCliente}
              onChange={(e) => setNuevoCliente(e.target.value)}
              placeholder="Ingrese el ID del nuevo cliente"
              required
            />
          )}
        </div>
      }
      onSubmit={handleSubmit}
    />
  );
};

export default RegistroVehiculo;