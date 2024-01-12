import React, { useState, useEffect } from "react";
import "./Payment.css";
import { CustomInput } from "../../common/Custominput/Custominput";
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
  const [isFormValid, setIsFormValid] = useState(false);
  const [amountErrorMessage, setAmountErrorMessage] = useState("");

  useEffect(() => {
    const fetchPaymentOptions = async () => {
      try {
        // const currenciesResponse = await getCurrencies();
        // setPaymentOptions(currenciesResponse.data);
        const currenciesResponse = [
            {blockchain: "BCH_TEST",
            image: "https://payments.pre-bnvo.com/media/crytocurrencies/CryptoBCH_Size36_px_TT7Td9Q.png",
            max_amount: "20000.00",
            min_amount: "0.05",
            name: "Bitcoin Cash Test BCH",
            symbol: "BCH_TEST"},
            {blockchain: "BTC_TEST",
                image: "https://payments.pre-bnvo.com/media/crytocurrencies/CurrencyBTC_Size36_px_StrokeON.png",
                max_amount: "10000.00",
                min_amount: "0.01",
                name: "Bitcoin Test BTC",
                symbol: "BTC_TEST"},
            {blockchain: "ETH_TEST",
                image: "https://payments.pre-bnvo.com/media/crytocurrencies/CurrencyETH_Size36_px_StrokeON.png",
                max_amount: "20000.00",
                min_amount: "0.05",
                name: "Ethereum Goerli ETH",
                symbol: "ETH_TEST3"},
            {blockchain: "XRP_TEST",
                image: "https://payments.pre-bnvo.com/media/crytocurrencies/CurrencyXRP_Size36_px_StrokeON.png",
                max_amount: "20000.00",
                min_amount: "0.01",
                name: "Ripple Test XRP",
                symbol: "XRP_TEST"},
            {blockchain: "ETH_TEST3",
                image: "https://payments.pre-bnvo.com/media/crytocurrencies/Property_1USDC_-_Ethereum_StrokeON.png",
                max_amount: "100.00",
                min_amount: "0.05",
                name: "USD Coin USDC",
                symbol: "USDC_TEST3"}
        ]
        setPaymentOptions(currenciesResponse);
        console.log("Respuesta exitosa:", currenciesResponse);
      } catch (error) {
        console.error("Error al obtener las opciones de la API:", error);
      }
    };

    fetchPaymentOptions();
  }, []);

  useEffect(() => {
    const isValid = transaccion.amount && transaccion.concept && transaccion.paymentMethod;
    setIsFormValid(isValid);
  }, [transaccion]);

  const functionHandler = (e) => {
    const { name, value } = e.target;

    if (name === 'amount') {
      const selectedCurrency = paymentOptions.find((currency) => currency.symbol === transaccion.paymentMethod);
      const minValue = parseFloat(selectedCurrency.min_amount);
      const maxValue = parseFloat(selectedCurrency.max_amount);
      const floatValue = parseFloat(value);

      if (value === '' || /^\d+(\.\d+)?$/.test(value) && floatValue >= minValue && floatValue <= maxValue) {
        setAmountErrorMessage("");
      } else {
        setAmountErrorMessage(`Formato incorrecto o el importe debe estar entre ${minValue} y ${maxValue}`);
        return;
      }
    }

    setTransaccion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isValidRange = (value) => {
    const selectedCurrency = paymentOptions.find((currency) => currency.symbol === transaccion.paymentMethod);
    const minValue = parseFloat(selectedCurrency.min_amount);
    const maxValue = parseFloat(selectedCurrency.max_amount);
    const floatValue = parseFloat(value);

    return floatValue >= minValue && floatValue <= maxValue;
  };

  const handleSubmit = () => {
    console.log("Handle submit called!");
    console.log("Amount:", transaccion.amount);
    console.log("Payment Method:", transaccion.paymentMethod);
    console.log("Concept:", transaccion.concept);
  };

  return (
    <div className="total-container">
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
            functionBlur={() => {}}
            errorMessage={amountErrorMessage}
          />
        </div>

        <div className="label-input-container">
          <label htmlFor="paymentMethod">Seleccionar moneda</label>
          <DropdownInput
            value={transaccion.paymentMethod}
            onChange={(e) => {
                const selectedValue = e?.target?.value || e;
                console.log("Selected Value:", selectedValue);
                setTransaccion((prevState) => ({
                  ...prevState,
                  paymentMethod: selectedValue,
                }));
              }}                           
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
            functionBlur={() => {}}
          />
        </div>
        <LinkButton
          path="/"
          title="Continuar"
          onClick={handleSubmit}
          disabled={!isFormValid}
        />
      </div>
    </div>
  );
};

export default Payment;
