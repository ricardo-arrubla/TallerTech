import { useState } from "react";
import "./Estilos/RegistroCliente.css";
import FormularioRegistro from "./FormularioRegistro";

const RegistroCliente = () => {
  const handleSubmit = (data) => {
    const clientesGuardados = JSON.parse(localStorage.getItem("clientes")) || [];

    // Validar que el ID no exista
    if (clientesGuardados.some((cliente) => cliente.id === data.id)) {
      alert("❌ El ID ya está registrado. Por favor, use otro.");
      return;
    }

    // Validar que todos los campos estén llenos
    if (!data.nombre || !data.id || !data.tecnomecanica) {
      alert("❌ Todos los campos son obligatorios.");
      return;
    }

    // Guardar cliente con más detalles
    clientesGuardados.push({
      id: data.id,
      nombre: data.nombre,
      tecnomecanica: data.tecnomecanica,
    });

    localStorage.setItem("clientes", JSON.stringify(clientesGuardados));

    alert("✅ Cliente registrado con éxito.");
  };

  return (
    <FormularioRegistro
      tipo="Registro de Cliente"
      campos={[
        { name: "nombre", label: "Nombre", type: "text", placeholder: "Ingrese su nombre" },
        { name: "id", label: "ID", type: "text", placeholder: "Ingrese su ID" },
        { name: "tecnomecanica", label: "Vencimiento Tecnomecánica", type: "date" },
      ]}
      onSubmit={handleSubmit}
    />
  );
};

export default RegistroCliente;
