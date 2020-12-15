import api from './api';

export const getUpcomingMovieSessionListByCinemaId = (cinemaId) => {
    return api.get(
        '/movie_sessions?cinema=' + cinemaId + '&sessionStatus=upcoming'
    );
};
