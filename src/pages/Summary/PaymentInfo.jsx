import React, { useEffect, useState } from "react";
import { getPaymentInfo } from "../../services/apiCalls";
import { usePaymentContext } from "../../context/PaymentContext";
import { format } from "date-fns";

export const PaymentInfo = () => {
  const { paymentInfo, currenciesResponse } = usePaymentContext();
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

  if (!paymentInfoApi || !paymentInfoApi[0] || !currenciesResponse) {
    return <div>Esperando el identificador...</div>;
  }

  const paymentData = paymentInfoApi[0];

  // Buscar la moneda correspondiente en currenciesResponse
  const selectedCurrency = currenciesResponse.find(
    (currency) => currency.symbol === paymentData.currency_id
  );

  const selectedCurrencyImage = selectedCurrency ? (
    <img
      src={selectedCurrency.image}
      alt={`${selectedCurrency.name} Logo`}
      style={{ width: "24px", height: "24px", marginRight: "8px" }}
    />
  ) : null;

  const selectedCurrencyName = selectedCurrency ? selectedCurrency.name : 'Moneda Desconocida';

  return (
    <div>
      <h2>Información del Pago</h2>
      <p>
        Importe: {paymentData.fiat_amount}{' '}{'EUR'}
      </p>
      <p>
        Moneda Seleccionada: {selectedCurrencyImage}
        {selectedCurrencyName}
      </p>
      <p>Comercio: {paymentData.merchant_device}</p>
      <p>Fecha: {paymentData.edited_at}</p>
      <p>Concepto: {paymentData.notes}</p>
    </div>
  );
};
