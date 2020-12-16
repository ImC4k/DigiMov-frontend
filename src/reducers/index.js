import cinemas from './cinema.reducer';
import booking from './booking.reducer'

import { combineReducers } from 'redux';
export default combineReducers({
  cinemas,
  booking
});
