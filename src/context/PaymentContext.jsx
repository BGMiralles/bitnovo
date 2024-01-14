import React, { createContext, useContext, useState } from "react";

const PaymentContext = createContext();

const PaymentProvider = ({ children }) => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [currenciesResponse, setCurrenciesResponse] = useState([]);

  const savePaymentInfo = async (info) => {
    try {
      if (info && info.identifier) {
        setPaymentInfo(info);
      } else {
        console.error("Error: No se proporcionó un identifier válido.");
      }
    } catch (error) {
      console.error("Error al guardar la información del pago:", error);
    }
  };

  const saveCurrenciesResponse = (response) => {
    try {
      setCurrenciesResponse(response);
    } catch (error) {
      console.error("Error al guardar la respuesta de la API de monedas:", error);
    }
  };

  return (
    <PaymentContext.Provider value={{ paymentInfo, currenciesResponse, savePaymentInfo, saveCurrenciesResponse }}>
      {children}
    </PaymentContext.Provider>
  );
};

const usePaymentContext = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePaymentContext must be used within a PaymentProvider");
  }
  return context;
};

export { PaymentProvider, usePaymentContext };
