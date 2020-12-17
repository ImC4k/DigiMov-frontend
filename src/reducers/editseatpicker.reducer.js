import { INIT_ORDER_RESPONSE, SET_ORDER_RESPONSE } from '../actionTypes/editseatpicker.actionTypes';

const orderResponse = (state = {}, action) => {
  if (action.type === INIT_ORDER_RESPONSE) {
    return action.payload;
  }
  if (action.type === SET_ORDER_RESPONSE) {
      console.log(action.payload);
    return action.payload;
  }
  console.log("no action fired")
  return state;
};
export default orderResponse;
