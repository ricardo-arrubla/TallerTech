import { useState, useEffect } from "react";
import "./Estilos/PerfilTaller.css";

const PerfilTaller = () => {
  // Estado para almacenar los datos del dueño del taller
  const [perfil, setPerfil] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    logo: "",
  });

  const [editando, setEditando] = useState(false);

  // Cargar datos almacenados en LocalStorage al iniciar
  useEffect(() => {
    const datosGuardados = JSON.parse(localStorage.getItem("perfilTaller"));
    if (datosGuardados) {
      setPerfil(datosGuardados);
    }
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil({ ...perfil, [name]: value });
  };

  // Manejar carga de imagen
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPerfil({ ...perfil, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Guardar datos en LocalStorage
  const handleSave = () => {
    localStorage.setItem("perfilTaller", JSON.stringify(perfil));
    setEditando(false);
    alert("✅ Información guardada correctamente.");
  };

  return (
    <div className="perfil-container">
      <h2>🏠 Perfil del Dueño del Taller</h2>

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
          <label>Nombre:</label>
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
        </div>
      </div>

      {/* Botón de editar o guardar */}
      {editando ? (
        <button className="guardar-btn" onClick={handleSave}>💾 Guardar</button>
      ) : (
        <button className="editar-btn" onClick={() => setEditando(true)}>✏️ Editar</button>
      )}
    </div>
  );
};

export default PerfilTaller;
