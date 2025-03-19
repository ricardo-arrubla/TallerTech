import { useState } from "react";
import PropTypes from "prop-types"; // Para validación de props
import "./Estilos/FormularioRegistro.css";

const FormularioRegistro = ({ tipo, campos, opciones, onSubmit, extraFields }) => {
  // Estado inicial basado en los campos recibidos
  const estadoInicial = campos.reduce((acc, campo) => {
    acc[campo.name] = campo.defaultValue || "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(estadoInicial);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica (evita campos vacíos)
    const camposIncompletos = Object.values(formData).some((valor) => !valor);
    if (camposIncompletos) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    onSubmit(formData); // Función personalizada para cada tipo de registro
    alert(`${tipo} registrado correctamente ✅`);
    setFormData(estadoInicial); // Limpia el formulario
  };

  return (
    <div className="formulario-registro-container">
      <h2>📝 {tipo}</h2>
      <form onSubmit={handleSubmit}>
        {campos.map((campo, index) => (
          <div key={index} className="campo">
            <label>{campo.label}:</label>
            {campo.type === "select" ? (
              <select name={campo.name} value={formData[campo.name]} onChange={handleChange} required>
                <option value="">Seleccione una opción</option>
                {opciones[campo.name].map((opcion, idx) => (
                  <option key={idx} value={opcion}>{opcion}</option>
                ))}
              </select>
            ) : (
              <input
                type={campo.type}
                name={campo.name}
                value={formData[campo.name]}
                onChange={handleChange}
                placeholder={campo.placeholder}
                required
              />
            )}
          </div>
        ))}

        {/* Agregar campos adicionales si se proporcionan */}
        {extraFields && extraFields()}

        <button type="submit">Registrar {tipo}</button>
      </form>
    </div>
  );
};

// Definimos los tipos de propiedades esperadas
FormularioRegistro.propTypes = {
  tipo: PropTypes.string.isRequired,
  campos: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      defaultValue: PropTypes.string,
    })
  ).isRequired,
  opciones: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  extraFields: PropTypes.func, // Prop opcional para campos adicionales
};

FormularioRegistro.defaultProps = {
  opciones: {},
  extraFields: null,
};

export default FormularioRegistro;