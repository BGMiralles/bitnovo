import React, { useEffect, useState } from "react";
import { getPaymentInfo } from "../../services/apiCalls";
import { usePaymentContext } from "../../context/PaymentContext";
import { format } from "date-fns";
import QRCode from "qrcode.react";
import CopyToClipboard from "react-copy-to-clipboard";
import "./PaymentInfo.css";
import copiarIcono from "../../img/copiar.png"
import { useNavigate } from "react-router-dom";

export const PaymentInfo = () => {
  const { paymentInfo, currenciesResponse } = usePaymentContext();
  const [paymentInfoApi, setPaymentInfoApi] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(900); 
  const [socketData, setSocketData] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (paymentInfo && paymentInfo.identifier) {
      const socket = new WebSocket(`wss://payments.pre-bnvo.com/ws/${paymentInfo.identifier}`);
      socket.onopen = () => {
        console.log("Socket connection opened");
      };
  
      socket.onmessage = (e) => {
        const socketData = JSON.parse(e.data);
        console.log("Socket data received:", socketData);
        setSocketData(socketData);
        if (socketData.status === "EX" || socketData.status === "OC") {
          navigate("/vista1");
        } else if (socketData.status === "CO" || socketData.status === "AC") {
          navigate("/vista2");
        }
      };
  
      socket.onclose = () => {
        console.log("Socket connection closed");
      };
  
      return () => {
        socket.close();
      };
    }
  }, [paymentInfo, setSocketData]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  if (!paymentInfoApi || !paymentInfoApi[0] || !currenciesResponse) {
    return <div>Esperando el identificador...</div>;
  }

  const paymentData = paymentInfoApi[0];

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

  const selectedCurrencyName = selectedCurrency
    ? selectedCurrency.name
    : "Moneda Desconocida";

  const formattedDate = format(
    new Date(paymentData.edited_at),
    "dd/MM/yyyy HH:mm"
  );

  // Generar datos para el QR
  const qrData = {
    address: paymentData.address,
    crypto_amount: paymentData.crypto_amount,
    tag_memo: paymentData.tag_memo || "",
  };

  return (
    <div className="payment-info-container">
      <div className="left-container">
        <h2>Resumen del pedido</h2>
        <p className="bold">
          <span className="field-name">Importe:</span>
          {paymentData.fiat_amount} {paymentData.fiat}
        </p>
        <div className="separator-line"></div>
        <p className="currency-info">
          <span className="field-name">Moneda seleccionada:</span>
          {selectedCurrencyImage}
          {selectedCurrencyName}
        </p>
        <div className="separator-line"></div>
        <p>
          <span className="field-name">Comercio:</span>
          {paymentData.merchant_device}
        </p>
        <p>
          <span className="field-name">Fecha:</span>
          {formattedDate}
        </p>
        <div className="separator-line"></div>
        <p>
          <span className="field-name">Concepto:</span>
          {paymentData.notes}
        </p>
      </div>
      <div className="right-container">
        <h2>Realiza el Pago</h2>
        <div className="centered">
          <p>
            Tiempo Restante: {Math.floor(timeRemaining / 60)}:
            {(timeRemaining % 60).toLocaleString("en-US", {
              minimumIntegerDigits: 2,
            })}
          </p>
          <div className="qr-code">
            <QRCode value={JSON.stringify(qrData)} />
          </div>
          <div className="additional-info">
            <div className="copy-field">
              <div>
                Enviar
                <span className="bold">{" "}{qrData.crypto_amount}{" "}{selectedCurrencyName}</span>
                <CopyToClipboard text={qrData.crypto_amount}>
                  <img
                    src={copiarIcono}
                    alt="Copiar"
                    className="copy-button"
                  />
                </CopyToClipboard>
              </div>
            </div>
            <div className="copy-field">
              <div>
                <span>{paymentData.address}</span>
                <CopyToClipboard text={paymentData.address}>
                  <img
                    src={copiarIcono}
                    alt="Copiar"
                    className="copy-button"
                  />
                </CopyToClipboard>
              </div>
            </div>
            {paymentData.currency_id === "XRP_TEST" && (
              <div className="copy-field">
                <div>
                  Etiqueta de Destino:
                  <span>{" "}{paymentData.tag_memo}</span>
                  <CopyToClipboard text={paymentData.tag_memo}>
                    <img
                      src={copiarIcono}
                      alt="Copiar"
                      className="copy-button"
                    />
                  </CopyToClipboard>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};