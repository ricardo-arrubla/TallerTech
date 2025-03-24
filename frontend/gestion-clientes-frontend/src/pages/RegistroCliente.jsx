import { useState } from "react";
import "./Estilos/RegistroCliente.css";
import FormularioRegistro from "./FormularioRegistro";

const RegistroCliente = () => {
  const handleSubmit = (data) => {
    // Obtener clientes guardados o inicializar un array vacío
    const clientesGuardados = JSON.parse(localStorage.getItem("clientes")) || [];

    // Validar que el ID no exista
    if (clientesGuardados.some((cliente) => cliente.id === data.id)) {
      alert("❌ El ID ya está registrado. Por favor, use otro.");
      return;
    }

    // Validar campos obligatorios
    if (!data.nombre || !data.id || !data.tecnomecanica) {
      alert("❌ Todos los campos obligatorios deben ser llenados.");
      return;
    }

    // Validar formato de correo electrónico (si se proporciona)
    if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
      alert("❌ El correo electrónico no es válido.");
      return;
    }

    // Crear objeto del cliente con campos adicionales y valores predeterminados
    const nuevoCliente = {
      id: data.id,
      nombre: data.nombre,
      tecnomecanica: data.tecnomecanica,
      email: data.email || "", // Campo opcional
      telefono: data.telefono || "", // Campo opcional
      direccion: data.direccion || "", // Campo opcional
      vehiculos: [], // Lista vacía de vehículos asociada desde el inicio
      estado: "Activo", // Estado por defecto
    };

    // Guardar cliente en localStorage
    clientesGuardados.push(nuevoCliente);
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
        { name: "email", label: "Correo Electrónico", type: "email", placeholder: "Ingrese su correo (opcional)" },
        { name: "telefono", label: "Teléfono", type: "tel", placeholder: "Ingrese su teléfono (opcional)" },
        { name: "direccion", label: "Dirección", type: "text", placeholder: "Ingrese su dirección (opcional)" },
      ]}
      onSubmit={handleSubmit}
    />
  );
};

export default RegistroCliente;