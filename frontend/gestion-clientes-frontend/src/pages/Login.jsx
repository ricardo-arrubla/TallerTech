import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Estilos/Login.css";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Simulación de credenciales
  const credenciales = {
    usuario: "admin",
    password: "1234",
  };

  // Validar si los campos están completos
  const isValidForm = () => {
    return usuario.trim() !== "" && password.trim() !== "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidForm()) {
      setError("❌ Por favor, completa todos los campos.");
      return;
    }

    if (usuario === credenciales.usuario && password === credenciales.password) {
      localStorage.setItem("usuario", usuario);
      navigate("/"); // Redirige a la página principal después de iniciar sesión
    } else {
      setError("❌ Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      {/* Logo */}
      <img src="/TallerTechLogo3.png" alt="Logo Taller Tech" className="logo" />

      {/* Título grande */}
      <h1>Bienvenido a Taller Tech</h1>

      {/* Título del formulario */}
      <h2>🔐 Iniciar Sesión</h2>

      {/* Mensaje de error */}
      {error && <p className="error-msg">{error}</p>}

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <label>ID de Usuario:</label>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
          autoFocus // Autofocus en el campo de usuario
        />

        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Botón deshabilitado si los campos están vacíos */}
        <button type="submit" disabled={!isValidForm()}>
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;