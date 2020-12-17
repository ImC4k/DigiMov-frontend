import api from './api';

export const getOrder = (email, cardNumber) => {
    return api.post("/orders/history", { email: email, cardNumber: cardNumber });
  };

export const getOrderById = (id) => {
    return api.get('/orders/' + id);
};
  