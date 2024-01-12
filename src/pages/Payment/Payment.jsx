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
  const { savePaymentInfo } = usePaymentContext();

  useEffect(() => {
    const fetchPaymentOptions = async () => {
      try {
        // const currenciesResponse = await getCurrencies();
        // setPaymentOptions(currenciesResponse.data);
        const currenciesResponse = [
          {
            blockchain: "BCH_TEST",
            image:
              "https://payments.pre-bnvo.com/media/crytocurrencies/CryptoBCH_Size36_px_TT7Td9Q.png",
            max_amount: "20000.00",
            min_amount: "0.05",
            name: "Bitcoin Cash Test BCH",
            symbol: "BCH_TEST",
          },
          {
            blockchain: "BTC_TEST",
            image:
              "https://payments.pre-bnvo.com/media/crytocurrencies/CurrencyBTC_Size36_px_StrokeON.png",
            max_amount: "10000.00",
            min_amount: "0.01",
            name: "Bitcoin Test BTC",
            symbol: "BTC_TEST",
          },
          {
            blockchain: "ETH_TEST",
            image:
              "https://payments.pre-bnvo.com/media/crytocurrencies/CurrencyETH_Size36_px_StrokeON.png",
            max_amount: "20000.00",
            min_amount: "0.05",
            name: "Ethereum Goerli ETH",
            symbol: "ETH_TEST3",
          },
          {
            blockchain: "XRP_TEST",
            image:
              "https://payments.pre-bnvo.com/media/crytocurrencies/CurrencyXRP_Size36_px_StrokeON.png",
            max_amount: "20000.00",
            min_amount: "0.01",
            name: "Ripple Test XRP",
            symbol: "XRP_TEST",
          },
          {
            blockchain: "ETH_TEST3",
            image:
              "https://payments.pre-bnvo.com/media/crytocurrencies/Property_1USDC_-_Ethereum_StrokeON.png",
            max_amount: "100.00",
            min_amount: "0.05",
            name: "USD Coin USDC",
            symbol: "USDC_TEST3",
          },
        ];
        setPaymentOptions(currenciesResponse);
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
      isValidRange(transaccion.amount);
    setIsFormValid(isValid);

    if (amountModified) {
      handleAmountBlur();
    }
  }, [transaccion]);

  const functionHandler = (e) => {
    const { name, value } = e.target;
    if (name === "concept") {
      if (value.length > 511) {
        setConceptErrorMessage(
          "El concepto no puede superar los 511 caracteres"
        );
        return;
      } else {
        setConceptErrorMessage("");
      }
    }

    if (name === "paymentMethod") {
      setTransaccion((prevState) => ({
        ...prevState,
        paymentMethod: value,
      }));
    }

    if (name === "amount") {
      setAmountModified(true);
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
      !/^(\d+(\.\d*)?|\.\d+)$/.test(transaccion.amount) ||
      floatValue < minValue ||
      floatValue > maxValue
    ) {
      setAmountErrorMessage(
        `Formato incorrecto o el importe debe estar entre ${minValue} y ${maxValue}`
      );
    } else {
      setAmountErrorMessage("");
    }
  };

  const isValidRange = (value) => {
    const selectedCurrency = paymentOptions.find(
      (currency) => currency.symbol === transaccion.paymentMethod
    );
    const minValue = parseFloat(selectedCurrency.min_amount);
    const maxValue = parseFloat(selectedCurrency.max_amount);
    const floatValue = parseFloat(value);

    return floatValue >= minValue && floatValue <= maxValue;
  };

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
            functionBlur={handleAmountBlur}
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
              handleAmountBlur();
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
            errorMessage={conceptErrorMessage}
          />
        </div>
        <LinkButton
          path="/paymentinfo"
          title="Continuar"
          onClick={() => {
            handleSubmit();
          }}
          disabled={!isFormValid}
        />
      </div>
    </div>
  );
};

export default Payment;
