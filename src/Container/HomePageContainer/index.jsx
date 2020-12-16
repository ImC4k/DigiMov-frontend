import { connect } from 'react-redux';
import HomePage from '../../Component/HomePage';
import { initMovies } from './../../actions/movie.action.js';

const mapDispatchToProps = (dispatch) => ({
    initMovieList: (movieList) => dispatch(initMovies(movieList)),
});

const mapStateToProps = (state) => ({
    movieList: state.movies
});

const HomePageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);

export default HomePageContainer;
