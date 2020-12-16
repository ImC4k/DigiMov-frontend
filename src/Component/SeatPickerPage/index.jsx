import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import './SeatPickerPage.css';
import '../Style/commonStyle.css';
import clsx from 'clsx';
import SeatPickerTable from './SeatPickerTable.jsx';

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieSessionResponse: {
        id: '123',
        movie: {
          id: '5fd817c808d4a5464c26de89',
          name: 'Beyond The Dream',
          duration: 120,
          cast: ['Terrance Lau', 'Cecilia Choi'],
          genres: [{ name: 'Romance' }, { name: 'Drama' }],
          director: 'Kiwi Chow',
          description:
            'Lok (Terrance Lau) is a recovering schizophrenic who yearns for love. One day, he encounters the young and beautiful Yan (Cecilia Choi) and quickly falls in love with her. Just when he struggles whether to tell her about his illness, he has a relapse and becomes delusional. Little does he know that she’s a psychological counselor who has a hidden agenda. The pair develops a relationship that is beyond their wildest dreams.',
          imageUrl:
            'https://wmoov.com/assets/movie/photo/201912/FB_IMG_1576452551183_1576574597.jpg',
          rating: 'IIB',
          language: 'Cantonese (Sub: Chinese, English)',
        },
        house: {
          id: '1234123',
          cinemaId: 'cinema1',
          name: 'House 1',
          capacity: 70,
        },
        startTime: 1608021005000,
        prices: {
          student: 10.0,
          adult: 20.0,
          elderly: 50.0,
        },
        occupied: {
          24: { status: 'sold' },
          25: { status: 'in process' },
          34: { status: 'sold' },
          35: { status: 'sold' },
          44: { status: 'sold' },
          45: { status: 'sold' },
        },
        occupancyCount: 5,
      },
      chosenSeat: [],
    };
  }

  updateChoseSeat = (seatNumber) => {
    let newChosenSeats = this.state.chosenSeat;
    if (this.state.chosenSeat.includes(seatNumber)) {
      newChosenSeats = newChosenSeats.filter((seat) => seat !== seatNumber);
    } else {
      newChosenSeats.push(seatNumber);
    }
    this.setState({ chosenSeat: newChosenSeats });
  };

  render() {
    const session = this.state.movieSessionResponse;
    const startDate = new Date(session.startTime).toLocaleDateString(
      'zh-Hans-CN'
    );
    const startTime = new Date(session.startTime).toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid container item xs={10} className={'main-content'}>
          <Grid container item xs={12}>
            <Grid container className={'custom-breadcrumbs'}>
            Sessions /
            </Grid>
            <Grid container className={'section-header'}>
              Seats
            </Grid>

            <Grid container className={'seat-picker-movie-name'}>
              {session.movie.name}
            </Grid>
            <Grid container className={'seat-picker-session-time'}>
              {startDate + ' ' + startTime}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid
          item
          xs={12}
          className={clsx('main-content', 'seat-picker-section')}
        >
          <Grid item xs={12} className={'seat-picker-house-name'}>
            {session.house.name}
          </Grid>
          <SeatPickerTable
            occupied={session.occupied}
            chosenSeat={this.state.chosenSeat}
            clickedSeat={this.updateChoseSeat}
          />
          
          <Grid item xs={12} align='center'>
            <div className={'seat-picker-proceed-button'}>Proceed</div>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
