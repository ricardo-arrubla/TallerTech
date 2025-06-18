import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";
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

<<<<<<< Updated upstream
    if (usuario === credenciales.usuario && password === credenciales.password) {
      localStorage.setItem("usuario", usuario);
      navigate("/"); // Redirige a la página principal después de iniciar sesión
=======
    // CAMBIO: Usar config.API_BASE_URL en lugar de URL hardcodeada
    const response = await fetch(`${config.API_BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_usuario: usuario,
        contraseña: password,
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem("token", data.access_token);
      navigate("/clientes");
>>>>>>> Stashed changes
    } else {
      setError("❌ Usuario o contraseña incorrectos");
    }
  };

<<<<<<< Updated upstream
=======
  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    if (!isValidRegisterForm()) {
      setRegisterError("❌ Por favor, completa todos los campos.");
      return;
    }

    if (!doPasswordsMatch()) {
      setRegisterError("❌ Las contraseñas no coinciden.");
      return;
    }

    // CAMBIO: Usar config.API_BASE_URL en lugar de URL hardcodeada
    const response = await fetch(`${config.API_BASE_URL}/api/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_usuario: newUser,
        contraseña: newPassword,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setRegisterError("");
      setShowRegisterForm(false); 
      alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
    } else {
      setRegisterError("❌ Error al registrar el usuario.");
    }
  };

>>>>>>> Stashed changes
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