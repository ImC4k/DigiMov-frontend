import React, { Component } from 'react';
import './MovieInfoModal.css';
import { Grid } from '@material-ui/core';
import clsx from 'clsx';

export default class MovieInfoModal extends Component {

  render() {
    const {movie} = this.props;
    return (
      <div className={clsx('info-modal')}>
        <img
          className={'movie-poster'}
          src={movie.imageUrl}
          alt={movie.name}
        />
        <div className={'poster-info-box'}>
          <Grid container justify='center' alignItems='center'>
            <Grid container item xs={10}>
              <Grid container className={'movie-info-modal-name'}>
                {movie.name}
              </Grid>

              <Grid container className={'movie-info-modal-title'}>
                Description
              </Grid>
              <Grid container className={'movie-info-modal-content'}>
                {movie.description}
              </Grid>

              <Grid container className={'movie-info-modal-title'}>
                Director
              </Grid>
              <Grid container className={'movie-info-modal-content'}>
                {movie.director}
              </Grid>

              <Grid container className={'movie-info-modal-title'}>
                Cast
              </Grid>
              <Grid container className={'movie-info-modal-content'}>
                {movie.cast.join(', ')}
              </Grid>

              <Grid container className={'movie-info-modal-title'}>
                Run Time
              </Grid>
              <Grid container className={'movie-info-modal-content'}>
                {movie.duration} minutes
              </Grid>

              <Grid container className={'movie-info-modal-title'}>
                Category
              </Grid>
              <Grid container className={'movie-info-modal-content'}>
                {movie.rating}
              </Grid>

              <Grid container className={'movie-info-modal-title'}>
                Genre
              </Grid>
              <Grid container className={'movie-info-modal-content'}>
                {movie.genres.map(genre=>genre.name).join(', ')}
              </Grid>

              <Grid container className={'movie-info-modal-title'}>
                Language
              </Grid>
              <Grid container className={'movie-info-modal-content'}>
                {movie.language}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
