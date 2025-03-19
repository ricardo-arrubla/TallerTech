import { useState } from "react";
import "./Estilos/RegistroCliente.css"; // Asegúrate de crear un archivo de estilos
import FormularioRegistro from "./FormularioRegistro";

const RegistroCliente = () => {
  const handleSubmit = (data) => {
    console.log("Cliente registrado:", data);

    // Guardar el cliente en localStorage
    const clientesGuardados = JSON.parse(localStorage.getItem("clientes")) || [];
    clientesGuardados.push({ id: data.id, nombre: data.nombre });
    localStorage.setItem("clientes", JSON.stringify(clientesGuardados));

    alert("Cliente registrado con éxito.");
  };

  return (
    <FormularioRegistro
      tipo="Registro de Cliente"
      campos={[
        { name: "nombre", label: "Nombre", type: "text", placeholder: "Ingrese su nombre" },
        { name: "id", label: "ID", type: "text", placeholder: "Ingrese su ID" },
        { name: "placa", label: "Placa del Carro", type: "text", placeholder: "Ingrese la placa" },
        { name: "marca", label: "Marca del Carro", type: "select", defaultValue: "Chevrolet" },
      ]}
      opciones={{
        marca: ["Chevrolet", "Tesla", "Toyota", "Ford", "Honda"],
      }}
      onSubmit={handleSubmit}
    />
  );
};

export default RegistroCliente;