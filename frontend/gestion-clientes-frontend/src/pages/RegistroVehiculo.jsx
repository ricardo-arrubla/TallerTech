import { useState } from "react";
import "./RegistroVehiculo.css"; // Asegúrate de crear un archivo de estilos

const RegistroVehiculo = () => {
  const [vehiculo, setVehiculo] = useState({
    placa: "",
    marca: "Chevrolet", // Valor por defecto
    modelo: "",
    anio: "",
    clienteId: "",
  });

  // Ampliamos la lista de marcas
  const marcas = [
    "Chevrolet",
    "Tesla",
    "Toyota",
    "Ford",
    "Honda",
    "BMW",
    "Mercedes-Benz",
    "Audi",
    "Volkswagen",
    "Nissan",
    "Hyundai",
    "Kia",
    "Mazda",
    "Subaru",
    "Lexus",
  ];

  const handleChange = (e) => {
    setVehiculo({ ...vehiculo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!vehiculo.placa || !vehiculo.modelo || !vehiculo.anio || !vehiculo.clienteId) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    console.log("Vehículo registrado:", vehiculo);
    alert("Vehículo registrado correctamente 🚗");

    // Limpiar formulario
    setVehiculo({ placa: "", marca: "Chevrolet", modelo: "", anio: "", clienteId: "" });
  };

  return (
    <div className="registro-vehiculo-container">
      <h2>🚗 Registro de Vehículo</h2>
      <form onSubmit={handleSubmit}>
        <label>Placa del Vehículo:</label>
        <input
          type="text"
          name="placa"
          value={vehiculo.placa}
          onChange={handleChange}
          required
          placeholder="Ingrese la placa"
        />

        <label>Marca:</label>
        <select name="marca" value={vehiculo.marca} onChange={handleChange} required>
          {marcas.map((marca, index) => (
            <option key={index} value={marca}>
              {marca}
            </option>
          ))}
        </select>

        <label>Modelo:</label>
        <input
          type="text"
          name="modelo"
          value={vehiculo.modelo}
          onChange={handleChange}
          required
          placeholder="Ingrese el modelo"
        />

        <label>Año:</label>
        <input
          type="number"
          name="anio"
          value={vehiculo.anio}
          onChange={handleChange}
          required
          placeholder="Ingrese el año"
        />

        <label>ID del Cliente:</label>
        <input
          type="text"
          name="clienteId"
          value={vehiculo.clienteId}
          onChange={handleChange}
          required
          placeholder="Ingrese ID del cliente"
        />

        <button type="submit">Registrar Vehículo</button>
      </form>
    </div>
  );
};

export default RegistroVehiculo;