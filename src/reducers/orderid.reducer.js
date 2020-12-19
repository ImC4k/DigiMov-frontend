import { SET_ORDER_ID } from '../actionTypes/editseatpicker.actionTypes';

const editSeatPickerOrderId = (state = '', action) => {
  if (action.type === SET_ORDER_ID) {
    return action.payload;
  }
  return state;
};
export default editSeatPickerOrderId;
