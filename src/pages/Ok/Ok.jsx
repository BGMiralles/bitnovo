import React from "react";
import "./Ok.css";
import { useNavigate } from "react-router-dom";

const Ok = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/");
  };

  return (
    <div className="contenedor-externo">
      <div className="contenedor-interno">
        <img src="../src/img/ok.JPG" alt="Ok Icon" className="imagen-ok" />
        <p className="mensaje">¡Pago completado!</p>
        <p className="nuevo-mensaje">Su pago se ha completado correctamente</p>
        <button className="linkButtonDesign" onClick={handleButtonClick}>
          Crear nuevo pago
        </button>
      </div>
    </div>
  );
}

export default Ok;