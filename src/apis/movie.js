import api from './api'

export const getAllMovies = () => {
    return api.get('/movies')
}