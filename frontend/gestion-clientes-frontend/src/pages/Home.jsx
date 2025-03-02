import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bienvenido a TallerTech</h1>
      <p>Gestión de clientes para talleres automotrices.</p>

      <div className="home-buttons">
  <Link to="/clientes">
    <button className="btn primary">Ver Clientes</button>
  </Link>
  <Link to="/registro-consumo">
    <button className="btn secondary">Registrar Consumo</button>
  </Link>
  <Link to="/reportes">
    <button className="btn reports">📊 Ver Reportes</button>
  </Link>
</div>

    </div>
  );
};

export default Home;
