import { createContext, useContext, useState } from 'react';

// Creamos el contexto
const PaymentContext = createContext();

// Creamos un componente Provider que envolverá a la aplicación
const PaymentProvider = ({ children }) => {
  // Aquí definirás el estado y funciones relacionadas con el pago
  const [paymentData, setPaymentData] = useState(null);

  // Puedes agregar más funciones y estado según sea necesario

  return (
    <PaymentContext.Provider value={{ paymentData, setPaymentData }}>
      {children}
    </PaymentContext.Provider>
  );
};

// Creamos un hook para consumir el contexto más fácilmente
const usePaymentContext = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePaymentContext debe ser usado dentro de un PaymentProvider');
  }
  return context;
};

export { PaymentProvider, usePaymentContext };
