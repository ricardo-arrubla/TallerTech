import React from "react";
import "../Estilos/Tabla.css";

const Tabla = ({ columns, data, actions }) => (
  <table className="generic-table">
    <thead>
      <tr>
        {columns.map((col, i) => (
          <th key={i}>{col.label}</th>
        ))}
        {actions && <th>Acciones</th>}
      </tr>
    </thead>
    <tbody>
      {data.length ? (
        data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col, colIndex) => (
              <td key={colIndex}>{row[col.key]}</td>
            ))}
            {actions && <td>{actions(row)}</td>}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={columns.length + (actions ? 1 : 0)}>
            No hay datos disponibles.
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

export default Tabla;
