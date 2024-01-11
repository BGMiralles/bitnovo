import React, { useState, useEffect } from "react";
import "./Payment.css";
import { CustomInput } from "../../common/CustomInput/Custominput";
import { DropdownInput } from "../../common/DropdownInput/DropdownInput";
import { LinkButton } from "../../common/LinkButton/LinkButton";
import { getCurrencies } from "../../services/apiCalls";

const Payment = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [concept, setConcept] = useState("");
  const [paymentOptions, setPaymentOptions] = useState([]);

  useEffect(() => {
    const fetchPaymentOptions = async () => {
      try {
        const currenciesResponse = await getCurrencies();
        console.log("Respuesta exitosa:", currenciesResponse.data);
      } catch (error) {
        console.error("Error al obtener las opciones de la API:", error);
      }
    };

    fetchPaymentOptions();
  }, []);

  const handleSubmit = () => {
    console.log("Amount:", amount);
    console.log("Payment Method:", paymentMethod);
    console.log("Concept:", concept);
  };

  return (
    <div className="payment-container">
      <div className="titulo">Crear pago</div>
      <div className="label-input-container">
        <label htmlFor="amount">Importe a pagar</label>
        <CustomInput
          design="customInputStyle"
          type="text"
          name="amount"
          placeholder="Añade importe a pagar"
          value={amount}
          functionProp={(e) => setAmount(e.target.value)}
          functionBlur={(e) => console.log("Input blurred")}
        />
      </div>

      <div className="label-input-container">
        <label htmlFor="paymentMethod">Seleccionar moneda</label>
        <DropdownInput
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          options={paymentOptions}
        />
      </div>

      <div className="label-input-container">
        <label htmlFor="concept">Concepto</label>
        <CustomInput
          design="customInputStyle"
          type="text"
          name="concept"
          placeholder="Añade descripción del pago"
          value={concept}
          functionProp={(e) => setConcept(e.target.value)}
          functionBlur={(e) => console.log("Input blurred")}
        />
      </div>

      <LinkButton path="#" title="Continuar" onClick={handleSubmit} />
    </div>
  );
};

export default Payment;
