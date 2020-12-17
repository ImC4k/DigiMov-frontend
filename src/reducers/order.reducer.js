import { GET_ORDER_LIST_BY_CARD_AND_EMAIL } from './../actionTypes/order.actionType';

const orders = (state = [], action) => {
  if (action.type === GET_ORDER_LIST_BY_CARD_AND_EMAIL) {
    return action.payload;
  }
  return state;
};
export default orders;
