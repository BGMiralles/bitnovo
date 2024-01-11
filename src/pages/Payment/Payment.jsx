import React, { useState } from "react";
import "./Payment.css";
import { CustomInput } from "./CustomInput";
import { DropdownInput } from "./DropdownInput";
import { LinkButton } from "./LinkButton";

export const Payment = () => {
  // Estados para almacenar los valores de los campos
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [concept, setConcept] = useState("");

  // Opciones para el DropdownInput
  const paymentOptions = ["Option 1", "Option 2", "Option 3"];

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    // Aquí puedes manejar la lógica para enviar los datos
    // Por ejemplo, puedes imprimirlos en la consola por ahora
    console.log("Amount:", amount);
    console.log("Payment Method:", paymentMethod);
    console.log("Concept:", concept);
  };

  return (
    <div>
      {/* CustomInput para el monto a pagar */}
      <CustomInput
        design="customInputStyle"
        type="text"
        name="amount"
        placeholder="Ingrese el monto"
        value={amount}
        functionProp={(e) => setAmount(e.target.value)}
        functionBlur={(e) => console.log("Input blurred")}
      />

      {/* DropdownInput para seleccionar el método de pago */}
      <DropdownInput
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        options={paymentOptions}
      />

      {/* CustomInput para el concepto */}
      <CustomInput
        design="customInputStyle"
        type="text"
        name="concept"
        placeholder="Ingrese el concepto"
        value={concept}
        functionProp={(e) => setConcept(e.target.value)}
        functionBlur={(e) => console.log("Input blurred")}
      />

      {/* LinkButton para enviar el formulario */}
      <LinkButton path="#" title="Pagar" onClick={handleSubmit} />
    </div>
  );
};

export default Payment;
