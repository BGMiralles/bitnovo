import React, { useState, useEffect } from "react";
import "./Payment.css";
import { CustomInput } from "../../common/CustomInput/Custominput";
import { DropdownInput } from "../../common/DropdownInput/DropdownInput";
import { LinkButton } from "../../common/LinkButton/LinkButton";
import { getCurrencies } from "../../services/apiCalls";

const Payment = () => {
  const [transaccion, setTransaccion] = useState({
    amount: "",
    paymentMethod: "",
    concept: "",
  });
  const [paymentOptions, setPaymentOptions] = useState([]);

  const functionHandler = (e) => {
    setTransaccion((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchPaymentOptions = async () => {
      try {
        const currenciesResponse = await getCurrencies();
        setPaymentOptions(currenciesResponse.data);
        console.log("Respuesta exitosa:", currenciesResponse.data);
      } catch (error) {
        console.error("Error al obtener las opciones de la API:", error);
      }
    };

    fetchPaymentOptions();
  }, []);

  const isButtonDisabled = () => {
    return !transaccion.amount || !transaccion.paymentMethod || !transaccion.concept;
  };

  const handleSubmit = () => {
    console.log("Amount:", transaccion.amount);
    console.log("Payment Method:", transaccion.paymentMethod);
    console.log("Concept:", transaccion.concept);
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
          value={transaccion.amount}
          functionProp={functionHandler}
          functionBlur={(e) => console.log("hola")}
        />
      </div>

      <div className="label-input-container">
        <label htmlFor="paymentMethod">Seleccionar moneda</label>
        <DropdownInput
          value={transaccion.paymentMethod}
          onChange={(e) => setTransaccion((prevState) => ({ ...prevState, paymentMethod: e.target.value }))}
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
          value={transaccion.concept}
          functionProp={functionHandler}
          functionBlur={(e) => console.log(transaccion)}
        />
      </div>

      <LinkButton path="#" title="Continuar" onClick={handleSubmit} disabled={isButtonDisabled()} />
    </div>
  );
};

export default Payment;
