import api from './api';

export const getAllCinemas = () => {
  return api.get('/cinemas');
};
