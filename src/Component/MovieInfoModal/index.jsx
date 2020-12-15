import React, { Component } from 'react';
import './MovieInfoModal.css';
import { Grid } from '@material-ui/core';
import clsx from 'clsx';

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieInfo: {
        id: '5fd817c808d4a5464c26de89',
        name: 'Beyond The Dream',
        duration: 120,
        cast: ['Terrance Lau', 'Cecilia Choi'],
        genres: ['Romance', 'Drama'],
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
      <div className={ clsx('info-modal')}>
        {/* <img
          className={'movie-poster'}
          src={this.state.movieInfo.imageUrl}
          alt={this.state.movieInfo.name}
        /> */}

        <div className={'movie-poster'}></div>

        <div className={'poster-info-box'}>
          <Grid container justify='center' alignItems='center'>
            <Grid container item xs={10}>
              <Grid container className={'movie-name'}>
                {this.state.movieInfo.name}
              </Grid>

              <Grid container className={'section-title'}>
                Description
              </Grid>
              <Grid container className={'section-content'}>
                {this.state.movieInfo.description}
              </Grid>

              <Grid container className={'section-title'}>
                Director
              </Grid>
              <Grid container className={'section-content'}>
                {this.state.movieInfo.director}
              </Grid>

              <Grid container className={'section-title'}>
                Cast
              </Grid>
              <Grid container className={'section-content'}>
                {this.state.movieInfo.cast.join(', ')}
              </Grid>

              <Grid container className={'section-title'}>
                Run Time
              </Grid>
              <Grid container className={'section-content'}>
                {this.state.movieInfo.duration} minutes
              </Grid>

              <Grid container className={'section-title'}>
                Category
              </Grid>
              <Grid container className={'section-content'}>
                {this.state.movieInfo.rating}
              </Grid>

              <Grid container className={'section-title'}>
                Genre
              </Grid>
              <Grid container className={'section-content'}>
                {this.state.movieInfo.genres.join(', ')}
              </Grid>

              <Grid container className={'section-title'}>
                Language
              </Grid>
              <Grid container className={'section-content'}>
                {this.state.movieInfo.language}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
