import { INIT_ORDER_RESPONSE, SET_ORDER_RESPONSE } from '../actionTypes/editseatpicker.actionTypes';
export const initOrderResponse = (orderRespnose) => {
  return {
    type: INIT_ORDER_RESPONSE,
    payload: orderRespnose,
  };
};

export const setOrderResponse = (orderRespnose) => {
    return {
      type: SET_ORDER_RESPONSE,
      payload: orderRespnose,
    };
  };
