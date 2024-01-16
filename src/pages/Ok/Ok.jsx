import React from "react";
import "./Ok.css"; // Asegúrate de que el nombre del archivo CSS coincida con el nombre del componente
import { LinkButton } from "../../common/LinkButton/LinkButton";

function Ok() {
  return (
    <div className="contenedor-externo">
      <div className="contenedor-interno">
        <img src="../src/img/ok.JPG" alt="Ok Icon" className="imagen-ok" />
        <p className="mensaje">¡Pago completado!</p>
        <p className="nuevo-mensaje">Su pago se ha completado correctamente</p>
        <LinkButton path="/" title="Crear nuevo pago" />
      </div>
    </div>
  );
}

export default Ok;
