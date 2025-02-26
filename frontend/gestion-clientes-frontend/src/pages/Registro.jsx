import { Link } from "react-router-dom";

const Registro = () => {
  return (
    <div className="registro-page">
      <h1>Registro</h1>
      <p>Seleccione una opción para registrar datos.</p>

      <Link to="/registro-cliente">
        <button>Registrar Cliente</button>
      </Link>
    </div>
  );
};

export default Registro;
