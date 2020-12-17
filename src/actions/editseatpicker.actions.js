import { INIT_ORDER_RESPONSE, SET_ORDER_ID } from '../actionTypes/editseatpicker.actionTypes';
export const initOrderResponse = (orderRespnose) => {
  return {
    type: INIT_ORDER_RESPONSE,
    payload: orderRespnose,
  };
};

export const setOrderId = (orderId) => {
    return {
      type: SET_ORDER_ID,
      payload: orderId,
    };
  };
