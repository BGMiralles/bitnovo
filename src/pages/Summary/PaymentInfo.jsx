import React, { useEffect, useState } from "react";
import { getPaymentInfo } from "../../services/apiCalls";
import { usePaymentContext } from "../../context/PaymentContext";

export const PaymentInfo = () => {
  const { paymentInfo } = usePaymentContext();
  const [paymentInfoApi, setPaymentInfoApi] = useState(null);

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        if (paymentInfo) {
          const response = await getPaymentInfo(paymentInfo.identifier);
          setPaymentInfoApi(response);
        }
      } catch (error) {
        console.error("Error al obtener la información del pago:", error);
      }
    };

    fetchPaymentInfo();
  }, [paymentInfo]);

  // Efecto adicional para manejar el cambio en identifier después del montaje
  useEffect(() => {
    if (paymentInfo && paymentInfoApi) {
      // Aquí puedes realizar acciones adicionales si identifier cambia después del montaje
    }
  }, [paymentInfo, paymentInfoApi]);

  if (!paymentInfo) {
    return <div>Esperando el identificador...</div>;
  }

  return (
    <div>
      <h2>Información del Pago</h2>
      <p>
        Importe: {paymentInfoApi.expected_input_amount}{" "}
        {paymentInfoApi.input_currency}
      </p>
      <p>Moneda Seleccionada: {paymentInfoApi.input_currency}</p>
      <p>Fecha: {paymentInfoApi.created_at}</p>
      <p>Concepto: {paymentInfoApi.notes}</p>
    </div>
  );
};
