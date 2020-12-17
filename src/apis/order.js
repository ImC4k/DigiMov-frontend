import api from './api';
  
export const getOrderById = (id) => {
    return api.get('/orders/' + id);
};
  