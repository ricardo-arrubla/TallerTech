import { Link } from "react-router-dom";
import "./Navbar.css"; // Importamos los estilos

const Navbar = () => {
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
      </div>
    </nav>
  );
};

export default Navbar;
