import { useState } from "react";
import "./Estilos/RegistroCliente.css";
import FormularioRegistro from "./FormularioRegistro";

const RegistroCliente = () => {
  const handleSubmit = (data) => {
    const clientesGuardados = JSON.parse(localStorage.getItem("clientes")) || [];

    // Validar que el ID no exista
    if (clientesGuardados.some((cliente) => cliente.id === data.id)) {
      alert("El ID ya está registrado. Por favor, use otro.");
      return;
    }

    // Guardar el cliente
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
      ]}
      onSubmit={handleSubmit}
    />
  );
};

export default RegistroCliente;