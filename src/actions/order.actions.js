import { GET_ORDER_LIST_BY_CARD_AND_EMAIL } from "./../actionTypes/order.actionType";

export const getOrderListByCardAndEmail = (orderList) => {
  return {
    type: GET_ORDER_LIST_BY_CARD_AND_EMAIL,
    payload: orderList,
  };
};
