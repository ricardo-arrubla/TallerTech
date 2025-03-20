import { useState, useEffect } from "react";
import "./Estilos/PerfilTaller.css";

const PerfilTaller = () => {
  // 📌 Estado del Perfil
  const [perfil, setPerfil] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    logo: "",
    especializacion: "General",
    descripcion: "",
    servicios: [],
    horarioApertura: "08:00",
    horarioCierre: "18:00",
  });

  const [editando, setEditando] = useState(false);

  // 📌 Cargar datos desde `localStorage`
  useEffect(() => {
    const datosGuardados = JSON.parse(localStorage.getItem("perfilTaller"));
    if (datosGuardados) {
      setPerfil(datosGuardados);
    }
  }, []);

  // 📌 Manejo de cambios en los campos de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({ ...prev, [name]: value }));
  };

  // 📌 Manejo de carga de imagen
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPerfil((prev) => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 📌 Lista de especializaciones
  const especializaciones = [
    "General",
    "Frenos",
    "Alineación y Balanceo",
    "Llantas",
    "Diagnóstico Electrónico",
    "Cambio de Aceite",
    "Reparación de Motores",
  ];

  // 📌 Lista de servicios según especialización
  const serviciosDisponibles = {
    General: ["Frenos", "Cambio de Aceite", "Alineación", "Baterías", "Diagnóstico Electrónico"],
    Frenos: ["Revisión de Frenos", "Cambio de Pastillas", "Reparación de Freno ABS"],
    "Alineación y Balanceo": ["Alineación", "Balanceo de Ruedas", "Corrección de Caída"],
    Llantas: ["Cambio de Llantas", "Rotación de Llantas", "Ajuste de Presión"],
    "Diagnóstico Electrónico": ["Scanner Automotriz", "Chequeo de Sensores", "Codificación de Llaves"],
    "Cambio de Aceite": ["Cambio de Aceite", "Cambio de Filtros"],
    "Reparación de Motores": ["Diagnóstico de Motor", "Cambio de Piezas", "Ajuste de Válvulas"],
  };

  // 📌 Manejo de cambios en la especialización
  const handleEspecializacionChange = (e) => {
    const nuevaEspecializacion = e.target.value;
    setPerfil((prev) => ({
      ...prev,
      especializacion: nuevaEspecializacion,
      servicios: [],
    }));
  };

  // 📌 Manejo de selección de servicios
  const handleServiciosChange = (servicio) => {
    setPerfil((prev) => {
      const nuevosServicios = prev.servicios.includes(servicio)
        ? prev.servicios.filter((s) => s !== servicio)
        : [...prev.servicios, servicio];
      return { ...prev, servicios: nuevosServicios };
    });
  };

  // 📌 Guardar datos en `localStorage`
  const handleSave = () => {
    localStorage.setItem("perfilTaller", JSON.stringify(perfil));
    setEditando(false);
    alert("✅ Información guardada correctamente.");
  };

  return (
    <div className="perfil-container">
      <h2>🏠 Perfil del Taller</h2>

      <div className="perfil-content">
        <div className="perfil-logo">
          {perfil.logo ? (
            <img src={perfil.logo} alt="Logo del Taller" />
          ) : (
            <p>📷 No hay logo</p>
          )}
          {editando && <input type="file" accept="image/*" onChange={handleImageUpload} />}
        </div>

        <div className="perfil-info">
          <label>Nombre del Taller:</label>
          {editando ? (
            <input type="text" name="nombre" value={perfil.nombre} onChange={handleChange} />
          ) : (
            <p>{perfil.nombre || "No registrado"}</p>
          )}

          <label>Correo Electrónico:</label>
          {editando ? (
            <input type="email" name="correo" value={perfil.correo} onChange={handleChange} />
          ) : (
            <p>{perfil.correo || "No registrado"}</p>
          )}

          <label>Teléfono:</label>
          {editando ? (
            <input type="tel" name="telefono" value={perfil.telefono} onChange={handleChange} />
          ) : (
            <p>{perfil.telefono || "No registrado"}</p>
          )}

          <label>Dirección del Taller:</label>
          {editando ? (
            <input type="text" name="direccion" value={perfil.direccion} onChange={handleChange} />
          ) : (
            <p>{perfil.direccion || "No registrado"}</p>
          )}

          {/* 📌 Selección de Especialización */}
          <label>Especialización del Taller:</label>
          {editando ? (
            <select value={perfil.especializacion} onChange={handleEspecializacionChange}>
              {especializaciones.map((esp) => (
                <option key={esp} value={esp}>
                  {esp}
                </option>
              ))}
            </select>
          ) : (
            <p>{perfil.especializacion}</p>
          )}

          {/* 📌 Lista de Servicios */}
          {editando && (
            <div className="servicios-lista">
              <label>Servicios Ofrecidos:</label>
              {serviciosDisponibles[perfil.especializacion]?.map((servicio) => (
                <div key={servicio}>
                  <input
                    type="checkbox"
                    checked={perfil.servicios.includes(servicio)}
                    onChange={() => handleServiciosChange(servicio)}
                  />
                  <label>{servicio}</label>
                </div>
              ))}
            </div>
          )}

          {/* 📌 Horario del Taller */}
          <label>Horario de Atención:</label>
          {editando ? (
            <div className="horarios">
              <input type="time" name="horarioApertura" value={perfil.horarioApertura} onChange={handleChange} />
              <span> a </span>
              <input type="time" name="horarioCierre" value={perfil.horarioCierre} onChange={handleChange} />
            </div>
          ) : (
            <p>{perfil.horarioApertura} - {perfil.horarioCierre}</p>
          )}
        </div>
      </div>

      {/* 📌 Botones de Edición y Guardado */}
      {editando ? (
        <button className="guardar-btn" onClick={handleSave}>💾 Guardar</button>
      ) : (
        <button className="editar-btn" onClick={() => setEditando(true)}>✏️ Editar</button>
      )}
    </div>
  );
};

export default PerfilTaller;
