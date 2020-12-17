import { connect } from 'react-redux';
import MovieListPage from '../../Component/MovieListPage';
import { initMovies } from '../../actions/movie.actions.js';

const mapDispatchToProps = (dispatch) => ({
  initMovieList: (movieList) => dispatch(initMovies(movieList)),
});

const mapStateToProps = (state) => ({
    movieList: state.movies,
});
const MovieListPageConainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieListPage);

export default MovieListPageConainer;
