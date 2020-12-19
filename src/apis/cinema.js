import api from './api';

export const getAllCinemas = () => {
  return api.get('/cinemas');
};

export const getCinema = (id) => {
  return api.get('/cinemas/' + id);
};
