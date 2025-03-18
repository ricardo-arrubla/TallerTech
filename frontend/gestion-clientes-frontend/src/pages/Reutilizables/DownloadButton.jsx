import React from "react";
import "../Estilos/DownloadButton.css";

const DownloadButton = ({ label, onClick }) => {
  return (
    <button className="download-btn" onClick={onClick}>
      📄 {label}
    </button>
  );
};

export default DownloadButton;
