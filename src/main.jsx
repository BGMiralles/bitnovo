import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from '@mantine/core';
import { PaymentProvider } from "./context/PaymentContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider>
      <BrowserRouter>
        <PaymentProvider>
          <App />
        </PaymentProvider>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);