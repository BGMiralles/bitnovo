import React, { useState, useEffect } from "react";
import "./Payment.css";
import { CustomInput } from "../../common/Custominput/Custominput";
import { DropdownInput } from "../../common/DropdownInput/DropdownInput";
import { LinkButton } from "../../common/LinkButton/LinkButton";
import { getCurrencies, ordersCreate } from "../../services/apiCalls";
import { usePaymentContext } from "../../context/PaymentContext";

const Payment = () => {
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [amountErrorMessage, setAmountErrorMessage] = useState("");
  const [conceptErrorMessage, setConceptErrorMessage] = useState("");
  const [amountModified, setAmountModified] = useState(false);
  const { savePaymentInfo, saveCurrenciesResponse } = usePaymentContext();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchPaymentOptions = async () => {
      try {
        const currenciesResponse = await getCurrencies();
        setPaymentOptions(currenciesResponse.data);
        saveCurrenciesResponse(currenciesResponse.data);
      } catch (error) {
        console.error("Error al obtener las opciones de la API:", error);
      }
    };

    fetchPaymentOptions();
  }, []);

  const [transaccion, setTransaccion] = useState({
    amount: "",
    paymentMethod: paymentOptions.length > 0 ? paymentOptions[0].name : "",
    concept: "",
  });

  useEffect(() => {
    const isValid =
      transaccion.amount !== "" &&
      transaccion.concept &&
      isValidRange(transaccion.amount, transaccion.paymentMethod);
    setIsFormValid(isValid);
    if (amountModified) {
      handleAmountBlur();
    }
  }, [transaccion]);

  const functionHandler = (e) => {
    const { name, value } = e.target;
    if (name === "concept" && value.length > 511) {
      setConceptErrorMessage("El concepto no puede superar los 511 caracteres");
      return;
    } else {
      setConceptErrorMessage("");
    }
    setTransaccion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAmountBlur = () => {
    const floatValue = parseFloat(transaccion.amount);
    const selectedCurrency = paymentOptions.find(
      (currency) => currency.symbol === transaccion.paymentMethod
    );

    if (!selectedCurrency) {
      setAmountErrorMessage("Seleccione una moneda válida");
      return;
    }

    const minValue = parseFloat(selectedCurrency.min_amount);
    const maxValue = parseFloat(selectedCurrency.max_amount);

    if (
      transaccion.amount === "" ||
      !/^\d+(\.\d*)?$/.test(transaccion.amount) ||
      floatValue < minValue ||
      floatValue > maxValue
    ) {
      setAmountErrorMessage(
        `Formato incorrecto o el importe debe estar entre ${minValue} y ${maxValue}, asegurese de separar los decimales con un punto`
      );
    } else {
      setAmountErrorMessage("");
    }
  };

  const isValidRange = (value, paymentMethod) => {
    const selectedCurrency = paymentOptions.find(
      (currency) => currency.symbol === paymentMethod
    );

    if (!selectedCurrency) {
      setAmountErrorMessage("Seleccione una moneda válida");
      return false;
    }

    const minValue = parseFloat(selectedCurrency.min_amount);
    const maxValue = parseFloat(selectedCurrency.max_amount);
    const floatValue = parseFloat(value);

    return floatValue >= minValue && floatValue <= maxValue;
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest(".label-input-container")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const handleSubmit = async () => {
    try {
      const response = await ordersCreate({
        expected_output_amount: transaccion.amount,
        input_currency: transaccion.paymentMethod,
        notes: transaccion.concept,
      });

      if (response.data && response.data.identifier) {
        savePaymentInfo({ identifier: response.data.identifier });
      } else {
        console.error("Error: No se pudo obtener el identificador del pago.");
      }
    } catch (error) {
      console.error("Error al llamar a la API ordersCreate:", error);
    }
  };

  return (
    <div className={`total-container ${isOpen ? "menu-open" : ""}`}>
      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)}></div>
      )}
      <div className={`payment-container ${isOpen ? "dropdown-open" : ""}`}>
        {isOpen ? null : <div className="titulo">Crear pago</div>}
        {isOpen ? null : (
          <div className="label-input-container">
            <label htmlFor="amount">Importe a pagar</label>
            <CustomInput
              design="customInputStyle"
              type="text"
              name="amount"
              placeholder="Añade importe a pagar"
              value={transaccion.amount}
              functionProp={functionHandler}
              functionBlur={handleAmountBlur}
              errorMessage={amountErrorMessage}
            />
          </div>
        )}
        <div
          className={`label-input-container ${isOpen ? "dropdown-open" : ""}`}
        >
          <label htmlFor="paymentMethod">
            {isOpen ? "Seleccionar criptomoneda" : "Seleccionar moneda"}
          </label>
          <DropdownInput
            value={transaccion.paymentMethod}
            onChange={(e) => {
              const selectedValue = e?.target?.value || e;
              setTransaccion((prevState) => ({
                ...prevState,
                paymentMethod: selectedValue,
              }));
              setAmountModified(true);
              handleAmountBlur();
            }}
            options={paymentOptions}
            isOpen={isOpen}
            onToggle={setIsOpen}
          />
        </div>
        {isOpen ? null : (
          <div className="label-input-container">
            <label htmlFor="concept">Concepto</label>
            <CustomInput
              design="customInputStyle"
              type="text"
              name="concept"
              placeholder="Añade descripción del pago"
              value={transaccion.concept}
              functionProp={functionHandler}
              functionBlur={() => {}}
              errorMessage={conceptErrorMessage}
            />
          </div>
        )}
        {isOpen ? null : (
          <LinkButton
            path="/paymentinfo"
            title="Continuar"
            onClick={() => {
              handleSubmit();
            }}
            disabled={!isFormValid}
          />
        )}
      </div>
    </div>
  );
};

export default Payment;
