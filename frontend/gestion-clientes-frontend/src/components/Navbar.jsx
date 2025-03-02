import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
    window.location.reload(); // Recargar para aplicar la protección de rutas
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/TallerTechLogo2.png" alt="TallerTech Logo" />
        <h1>TallerTech</h1>
      </div>
      <div className="navbar-links">
        <Link to="/">Inicio</Link>
        <Link to="/registro">Registro</Link>
        <Link to="/consulta">Consulta</Link>
        <Link to="/clientes">Clientes</Link>
        <Link to="/inspeccion-vehiculo">Inspección</Link>
        <Link to="/diagnostico-vehiculo">Diagnóstico</Link>
        <Link to="/perfil-taller">Perfil del Taller</Link> {/* Nuevo enlace */}
        <Link to="/facturacion">Facturación</Link> {/* Nuevo enlace */}
        <Link to="/agendar-cita">Agendar Cita</Link> {/* Nuevo enlace */}

        <button className="logout-btn" onClick={handleLogout}>🚪 Cerrar Sesión</button>
        
      </div>
    </nav>
  );
};

export default Navbar;
