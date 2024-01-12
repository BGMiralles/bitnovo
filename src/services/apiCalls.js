import axios from "axios";

export const getCurrencies = async () => {
  try {
    const response = await axios.get('https://payments.pre-bnvo.com/api/v1/currencies', {
      headers: {
        'X-Device-Id': '012dd8fa-08ed-4dec-a291-d6c8da1c8f56'
      }
    });

    return response;
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
    if (error.response) {
      console.error('Respuesta del servidor:', error.response.data);
    }
    throw error; 
  }
};

export const ordersCreate = async (data) => {
  try {
    const response = await axios.post('https://payments.pre-bnvo.com/api/v1/orders/', data, {
      headers: {
        'X-Device-Id': '012dd8fa-08ed-4dec-a291-d6c8da1c8f56'
      }
    });

    return response;
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
    if (error.response) {
      console.error('Respuesta del servidor:', error.response.data);
    }
    throw error; 
  }
}