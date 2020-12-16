import api from './api';

export const getUpcomingMovieSessionListByCinemaId = (cinemaId) => {
    return api.get(
        '/movie_sessions?cinema=' + cinemaId + '&sessionStatus=upcoming'
    );
};

export const getMovieSessionListById = (movieSessionId) => {
    return api.get(
        '/movie_sessions/' + movieSessionId 
    );
}