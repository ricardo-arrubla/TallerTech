import { Link } from "react-router-dom";
import "./Navbar.css"; // Asegúrate de crear este archivo

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <h2 className="logo">TallerTech</h2>
        <div className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/registro">Registro</Link>
          <Link to="/consulta">Consulta</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
