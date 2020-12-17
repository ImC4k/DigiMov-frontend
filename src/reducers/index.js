import cinemas from './cinema.reducer';
import booking from './booking.reducer'
import movies from './movie.reducer';
import editSeatPickerOrderId from './orderid.reducer';

import { combineReducers } from 'redux';
export default combineReducers({
  cinemas,
  booking,
  movies,
  editSeatPickerOrderId
});
