import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bienvenido a TallerTech</h1>
      <p>Gestión de clientes para talleres automotrices.</p>

      <div className="home-buttons">
        <button className="btn primary">Ver Clientes</button>
        <button className="btn secondary">Registrar Consumo</button>
      </div>
    </div>
  );
};

export default Home;
