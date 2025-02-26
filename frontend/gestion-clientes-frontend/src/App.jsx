import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import "./App.css"; // Asegúrate de que esto está presente

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Respuesta del backend:", data); // 👀 Ver qué llega aquí
        setMessage(data.message);
      })
      .catch((error) => console.error("Error al conectar con el backend:", error));
  }, []);

  return (
    <div>
      <h1></h1>
      <p>{message}</p> {/* Aquí deberíamos ver el mensaje del backend */}
      <AppRoutes />
    </div>
  );
}

export default App;
