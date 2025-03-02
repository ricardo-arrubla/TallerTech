import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usuario === credenciales.usuario && password === credenciales.password) {
      localStorage.setItem("usuario", usuario);
      navigate("/"); // Redirige a la página principal después de iniciar sesión
    } else {
      setError("❌ Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <h2>🔐 Iniciar Sesión</h2>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>ID de Usuario:</label>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />

        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
