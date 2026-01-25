import React from "react";
import "../css/modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div>
      <div className="modal-container" onClick={onClose}>
        <div className="modal">
          <button>X</button>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
