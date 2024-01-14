import React, { useEffect, useState } from "react";
import { getPaymentInfo } from "../../services/apiCalls";
import { usePaymentContext } from "../../context/PaymentContext";
import { format } from "date-fns";
import QRCode from "qrcode.react";
import "./PaymentInfo.css";

export const PaymentInfo = () => {
  const { paymentInfo, currenciesResponse } = usePaymentContext();
  const [paymentInfoApi, setPaymentInfoApi] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes in seconds

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining((prevTime) => prevTime - 1);
      }
    }, 1000);

    // Limpiar intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [timeRemaining]);

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

  const formattedDate = format(
    new Date(paymentData.edited_at),
    "dd/MM/yyyy HH:mm"
  );

  // Generar datos para el QR
  const qrData = {
    address: paymentData.address,
    crypto_amount: paymentData.crypto_amount,
    // Asegúrate de manejar el caso en que tag_memo no esté definido
    tag_memo: paymentData.tag_memo || "",
  };

  return (
    <div className="payment-info-container">
      <div className="left-container">
        <h2>Información del Pago</h2>
        <p>
          Importe: {paymentData.fiat_amount}{' '}{paymentData.fiat}
        </p>
        <div className="separator-line"></div>
        <p className="currency-info">
          Moneda Seleccionada: {selectedCurrencyImage}
          {selectedCurrencyName}
        </p>
        <div className="separator-line"></div>
        <p>Comercio: {paymentData.merchant_device}</p>
        <p className="formatted-date">
          Fecha: {formattedDate}
        </p>
        <div className="separator-line"></div>
        <p>Concepto: {paymentData.notes}</p>
      </div>
      <div className="right-container">
        <h2>Realiza el Pago</h2>
        <p>Tiempo Restante: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toLocaleString('en-US', {minimumIntegerDigits: 2})}</p>
        <div className="qr-code">
          {/* Generar código QR con los datos */}
          <QRCode value={JSON.stringify(qrData)} />
        </div>
      </div>
    </div>
  );
};
