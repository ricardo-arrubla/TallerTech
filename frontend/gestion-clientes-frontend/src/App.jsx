import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        setShowPopup(true);
      })
      .catch(() => {
        setMessage("No se pudo conectar con el backend ❌");
        setShowPopup(true);
      });
  }, []);

  return (
    <div>
      {showPopup && (
        <div className="popup">
          <p>{message}</p>
          <button onClick={() => setShowPopup(false)}>Cerrar</button>
        </div>
      )}
      <AppRoutes />
    </div>
  );
}

export default App;
