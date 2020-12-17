import api from './api';
  
export const getOrderById = (id) => {
    return api.get('/orders/' + id);
};

export const editSeatPosition = (id, chosenSeat) => {
    return api.patch('/orders/' + id, chosenSeat);
};
  