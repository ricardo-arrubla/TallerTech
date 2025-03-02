import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "../pages/Home";
import Registro from "../pages/Registro";
import Consulta from "../pages/Consulta";
import RegistroCliente from "../pages/RegistroCliente";
import Clientes from "../pages/Clientes";
import RegistroConsumo from "../pages/RegistroConsumo";
import InspeccionVehiculo from "../pages/InspeccionVehiculo";
import Navbar from "../components/Navbar";
import Reports from "../pages/Reports";
import HistorialServicios from "../pages/HistorialServicios";
import DiagnosticoVehiculo from "../pages/DiagnosticoVehiculo";
import Login from "../pages/Login";
import PerfilTaller from "../pages/PerfilTaller"; // Importamos la nueva página
import Facturacion from "../pages/Facturacion"; // Importamos la nueva página
import AgendarCita from "../pages/AgendarCita"; // Importamos la nueva página
import RegistroVehiculo from "../pages/RegistroVehiculo"; // Importamos el nuevo componente

const AppRoutes = () => {
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (usuario) {
      setAutenticado(true);
    }
  }, []);

  return (
    <Router>
      {autenticado && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={autenticado ? <Home /> : <Navigate to="/login" />} />
        <Route path="/registro" element={autenticado ? <Registro /> : <Navigate to="/login" />} />
        <Route path="/consulta" element={autenticado ? <Consulta /> : <Navigate to="/login" />} />
        <Route path="/registro-cliente" element={autenticado ? <RegistroCliente /> : <Navigate to="/login" />} />
        <Route path="/clientes" element={autenticado ? <Clientes /> : <Navigate to="/login" />} />
        <Route path="/registro-consumo" element={autenticado ? <RegistroConsumo /> : <Navigate to="/login" />} />
        <Route path="/inspeccion-vehiculo" element={autenticado ? <InspeccionVehiculo /> : <Navigate to="/login" />} />
        <Route path="/reportes" element={autenticado ? <Reports /> : <Navigate to="/login" />} />
        <Route path="/historial-servicios" element={autenticado ? <HistorialServicios /> : <Navigate to="/login" />} />
        <Route path="/diagnostico-vehiculo" element={autenticado ? <DiagnosticoVehiculo /> : <Navigate to="/login" />} />
        <Route path="/perfil-taller" element={<PerfilTaller />} /> {/* Nueva ruta */}
        <Route path="/facturacion" element={<Facturacion />} /> {/* Nueva ruta */}
        <Route path="/agendar-cita" element={<AgendarCita />} /> {/* Nueva ruta */}
        {/* Agregamos la nueva ruta para Registro de Vehículo */}
        <Route path="/registro-vehiculo" element={autenticado ? <RegistroVehiculo /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;