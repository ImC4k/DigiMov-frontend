import cinemas from './cinema.reducer';
import booking from './booking.reducer'

import { combineReducers } from 'redux';
import movies from './movie.reducer';
export default combineReducers({
  cinemas,
  booking,
  movies
});
