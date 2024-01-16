import React from "react";
import "./Ko.css"; // Asegúrate de que el nombre del archivo CSS coincida con el nombre del componente
import { LinkButton } from "../../common/LinkButton/LinkButton";

function Ko() {
  return (
    <div className="contenedor-externo">
      <div className="contenedor-interno">
        <img src="../src/img/ko.JPG" alt="Ko Icon" className="imagen-ko" />
        <p className="mensaje">¡Pago cancelado!</p>
        <p className="nuevo-mensaje">Su pago no se ha completado correctamente o el tiempo para realizarlo ha expirado</p>
        <LinkButton path="/" title="Crear nuevo pago" />
      </div>
    </div>
  );
}

export default Ko;
