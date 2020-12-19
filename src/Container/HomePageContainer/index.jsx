import { connect } from 'react-redux';
import HomePage from '../../Component/HomePage';
import { initMovies } from './../../actions/movie.action.js';
import { initCinemas } from './../../actions/cinema.actions.js';

const mapDispatchToProps = (dispatch) => ({
    initMovieList: (movieList) => dispatch(initMovies(movieList)),
    initCinemaList: (cinemaList) => dispatch(initCinemas(cinemaList))
});

const mapStateToProps = (state) => ({
    movieList: state.movies,
    cinemaList: state.cinemas
});

const HomePageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);

export default HomePageContainer;
