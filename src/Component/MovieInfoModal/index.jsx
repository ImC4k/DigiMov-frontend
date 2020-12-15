import React, { Component } from 'react';
import './MovieInfoModal.css';
import { Grid } from '@material-ui/core';
import clsx from 'clsx';

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: {
        id: '5fd817c808d4a5464c26de89',
        name: 'Beyond The Dream',
        duration: 120,
        cast: ['Terrance Lau', 'Cecilia Choi'],
        genres: [{'name':'Romance'}, {'name':'Drama'}],
        director: 'Kiwi Chow',
        description:
          'Lok (Terrance Lau) is a recovering schizophrenic who yearns for love. One day, he encounters the young and beautiful Yan (Cecilia Choi) and quickly falls in love with her. Just when he struggles whether to tell her about his illness, he has a relapse and becomes delusional. Little does he know that she’s a psychological counselor who has a hidden agenda. The pair develops a relationship that is beyond their wildest dreams.',
        imageUrl:
          'https://wmoov.com/assets/movie/photo/201912/FB_IMG_1576452551183_1576574597.jpg',
        rating: 'IIB',
        language: 'Cantonese (Sub: Chinese, English)',
      },
    };
  }

  render() {
    return (
      <div className={clsx('info-modal')}>
        <img
          className={'movie-poster'}
          src={this.state.movie.imageUrl}
          alt={this.state.movie.name}
        />
        <div className={'poster-info-box'}>
          <Grid container justify='center' alignItems='center'>
            <Grid container item xs={10}>
              <Grid container className={'movie-info-modal-name'}>
                {this.state.movie.name}
              </Grid>

              <Grid container className={'movie-info-modal-title'}>
                Description
              </Grid>
              <Grid container className={'movie-info-modal-content'}>
                {this.state.movie.description}
              </Grid>

              <Grid container className={'movie-info-modal-title'}>
                Director
              </Grid>
              <Grid container className={'movie-info-modal-content'}>
                {this.state.movie.director}
              </Grid>

              <Grid container className={'movie-info-modal-title'}>
                Cast
              </Grid>
              <Grid container className={'movie-info-modal-content'}>
                {this.state.movie.cast.join(', ')}
              </Grid>

              <Grid container className={'movie-info-modal-title'}>
                Run Time
              </Grid>
              <Grid container className={'movie-info-modal-content'}>
                {this.state.movie.duration} minutes
              </Grid>

              <Grid container className={'movie-info-modal-title'}>
                Category
              </Grid>
              <Grid container className={'movie-info-modal-content'}>
                {this.state.movie.rating}
              </Grid>

              <Grid container className={'movie-info-modal-title'}>
                Genre
              </Grid>
              <Grid container className={'movie-info-modal-content'}>
                {this.state.movie.genres.map(genre=>genre.name).join(', ')}
              </Grid>

              <Grid container className={'movie-info-modal-title'}>
                Language
              </Grid>
              <Grid container className={'movie-info-modal-content'}>
                {this.state.movie.language}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
