import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Registro from "../pages/Registro";
import Consulta from "../pages/Consulta";
import Navbar from "../components/Navbar"; // IMPORTANTE

const AppRoutes = () => {
  return (
    <Router>
      <Navbar /> {/* Asegúrate de que está fuera de <Routes> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/consulta" element={<Consulta />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
