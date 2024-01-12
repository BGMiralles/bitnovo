import axios from 'axios';

const API_BASE_URL = 'https://payments.pre-bnvo.com/api/v1';

const commonHeaders = {
  'X-Device-Id': '012dd8fa-08ed-4dec-a291-d6c8da1c8f56',
};

export const getCurrencies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/currencies`, {
      headers: commonHeaders,
    });

    return response;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    if (error.response) {
      console.error("Respuesta del servidor:", error.response.data);
    }
    throw error;
  }
};

export const ordersCreate = async (data) => {
  try {
    console.log("ordersCreate llamado con datos:", data);

    const response = await axios.post(`${API_BASE_URL}/orders/`, data, {
      headers: commonHeaders,
    });

    console.log("Respuesta de ordersCreate:", response);

    return response;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    if (error.response) {
      console.error("Respuesta del servidor:", error.response.data);
    }
    throw error;
  }
};

export const getPaymentInfo = async (identifier) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/info/${identifier}`, {
      headers: commonHeaders,
    });
    console.log("Respuesta de getPaymentInfo:", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
