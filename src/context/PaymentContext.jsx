import React, { createContext, useContext, useState } from "react";

const PaymentContext = createContext();

const PaymentProvider = ({ children }) => {
  const [paymentInfo, setPaymentInfo] = useState(null);

  const savePaymentInfo = (info) => {
    setPaymentInfo(info);
  };

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
