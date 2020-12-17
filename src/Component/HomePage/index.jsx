import React, { Component } from 'react';
import { getAllMovies } from './../../apis/movie';
import './HomePage.css';
import { Grid } from '@material-ui/core';
import MovieCard from '../HomeMovieCard/index';
import { getAllCinemas } from './../../apis/cinema';
import HomeCinemaCard from './../HomeCinemaCard/index';
import CircularLoading from '../Style/CircularLoading';
export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = { loadingData: true };
  }

  componentDidMount() {
    getAllMovies().then((response) => {
      this.props.initMovieList(response.data);
    });
    getAllCinemas().then((response) => {
      this.props.initCinemaList(response.data);
    });
  }

  render() {
    const movies =
      this.props.movieList.length > 0 ? (
        this.props.movieList
          .slice(0, 4)
          .map((movie) => <MovieCard key={movie.id} movie={movie} />)
      ) : this.state.loadingData ? (
        <Grid container item xs={12} justify='center'>
          <CircularLoading />
        </Grid>
      ) : (
        <p className={'indicator-text'}>No available movie</p>
      );

    const cinemas =
      this.props.cinemaList.length > 0 ? (
        this.props.cinemaList.slice(0, 4).map((cinema) => (
          <Grid
            key={cinema.id}
            className={'home-cinema-card'}
            container
            item
            xs={12}
          >
            <HomeCinemaCard cinema={cinema} />
          </Grid>
        ))
      ) : this.state.loadingData ? (
        <Grid container item xs={12} justify='center'>
          <CircularLoading />
        </Grid>
      ) : (
        <p className={'indicator-text'}>No available cinema</p>
      );

    return (
      <Grid container justify='center' alignItems='center' className={'information'} xs={12}>
        <Grid container item xs={10} className={'main-content'}>
          <Grid container item xs={12} alignItems={'flex-end'}>
            <Grid container item xs={8}>
              <div className={'section-header'}>New Movies</div>
            </Grid>
            <Grid className={'section-more'} container item xs={4} justify='flex-end'>
              <a href='/movies' className={'link-style-button'}>More</a>
            </Grid>
          </Grid>
          <Grid container item justify='center' alignItems='center' xs={12}>
            {movies}
          </Grid>
          <Grid container item xs={12} alignItems={'flex-end'}>
            <Grid container item xs={8}>
              <div className={'section-header'}>Cinemas</div>
            </Grid>
            <Grid className={'section-more'} container item xs={4} justify='flex-end'>
              <a href='/cinemas' className={'link-style-button'}>More</a>
            </Grid>
          </Grid>
          <Grid container item justify='center' alignItems='center' xs={12}>
              <Grid className={'scrolling-wrapper'}>
                <div>
                  {cinemas}
                </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
