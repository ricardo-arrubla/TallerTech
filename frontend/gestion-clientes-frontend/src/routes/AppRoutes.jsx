import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Registro from "../pages/Registro";
import Consulta from "../pages/Consulta";
import RegistroCliente from "../pages/RegistroCliente"; // Importar la nueva página
import Navbar from "../components/Navbar";

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/consulta" element={<Consulta />} />
        <Route path="/registro-cliente" element={<RegistroCliente />} /> {/* Nueva ruta */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
