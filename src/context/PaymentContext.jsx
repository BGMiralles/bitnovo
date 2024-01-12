import React, { createContext, useContext, useState } from "react";

const PaymentContext = createContext();

const PaymentProvider = ({ children }) => {
  const [paymentInfo, setPaymentInfo] = useState(null);

  const savePaymentInfo = async (info) => {
    try {
      // Verificar que info tiene un identifier antes de continuar
      if (info && info.identifier) {
        setPaymentInfo(info);
      } else {
        console.error("Error: No se proporcionó un identifier válido.");
      }
    } catch (error) {
      console.error("Error al guardar la información del pago:", error);
    }
  };  
  console.log("paymentInfo", paymentInfo);
  return (
    <PaymentContext.Provider value={{ paymentInfo, savePaymentInfo }}>
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
