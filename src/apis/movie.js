import api from './api';

export const getAllMovies = () => {
  return api.get('/movies');
};

export const getMovie = (id) => {
  return api.get('/movies/' + id);
};
