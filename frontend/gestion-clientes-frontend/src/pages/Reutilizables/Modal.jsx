import React from "react";
import "../Estilos/Modal.css";

const Modal = ({ title, children, onClose, onSave }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3>{title}</h3>
      <div className="modal-body">{children}</div>
      <div className="modal-actions">
        <button onClick={onClose} className="btn-cancelar">
          Cancelar
        </button>
        {onSave && (
          <button onClick={onSave} className="btn-guardar">
            Guardar
          </button>
        )}
      </div>
    </div>
  </div>
);

export default Modal;
