import React from "react";
import "./Ko.css";
import { useNavigate } from "react-router-dom";
import ko from '../../img/ko.png'

const Ko = () => {
    const navigate = useNavigate();
    const handleButtonClick = () => {
      navigate("/");
    };
  return (
    <div className="contenedor-externo">
      <div className="contenedor-interno">
        <img src={ko} alt="Ko Icon" className="imagen-ko" />
        <p className="mensaje">¡Pago cancelado!</p>
        <p className="nuevo-mensaje">Su pago no se ha completado correctamente o el tiempo para realizarlo ha expirado</p>
        <button className="linkButtonDesign" onClick={handleButtonClick}>
          Crear nuevo pago
        </button>
      </div>
    </div>
  );
}

export default Ko;