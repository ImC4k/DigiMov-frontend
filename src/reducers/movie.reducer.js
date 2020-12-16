import { INIT_MOVIE_LIST } from './../actionTypes/movie.actionTypes';

const movies = (state = [], action) => {
  if (action.type === INIT_MOVIE_LIST) {
    return action.payload;
  }
  return state;
};
export default movies;
