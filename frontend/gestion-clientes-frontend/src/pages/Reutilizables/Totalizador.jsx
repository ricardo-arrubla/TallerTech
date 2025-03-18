import React from "react";
import "../Estilos/Totalizador.css";

const Totalizador = ({ subtotal, impuestos, total }) => {
  return (
    <div className="totalizador">
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Impuestos (16%): ${impuestos.toFixed(2)}</p>
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default Totalizador;
