import { useState } from "react";
import "./Estilos/RegistroConsumo.css";
import FormularioRegistro from "./FormularioRegistro";

const RegistroConsumo = () => {
  return (
    <FormularioRegistro
      tipo="Registro de Consumo"
      campos={[
        { name: "clienteId", label: "ID Cliente", type: "select" },
        { name: "placaVehiculo", label: "Placa Vehículo", type: "select" },
        { name: "servicio", label: "Servicio", type: "select" },
        { name: "costo", label: "Costo ($)", type: "number", placeholder: "Ingrese el costo" },
        { name: "fecha", label: "Fecha", type: "date" },
      ]}
      opciones={{
        clienteId: ["C001", "C002", "C003"],
        placaVehiculo: ["ABC123", "XYZ456", "DEF789"],
        servicio: ["Cambio de Aceite", "Alineación", "Revisión de Frenos"],
      }}
      onSubmit={(data) => console.log("Consumo registrado:", data)}
    />
  );
};

export default RegistroConsumo;
