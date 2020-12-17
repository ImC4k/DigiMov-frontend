import { INIT_MOVIE_LIST } from './../actionTypes/movie.actionTypes';
export const initMovies = (movieList) => {
  return {
    type: INIT_MOVIE_LIST,
    payload: movieList,
  };
};
