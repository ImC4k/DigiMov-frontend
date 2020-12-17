import React, { Component } from 'react';
import { Button, Grid } from '@material-ui/core';
import './SeatPickerPage.css';
import '../Style/commonStyle.css';
import SeatPickerTable from './SeatPickerTable.jsx';

import { proceedSeat } from '../../apis/booking';
import { getMovieSessionListById } from '../../apis/movieSession'

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.setState({ chosenSeat: newChosenSeats.sort() });
  };

  onClickProceedButton = () => {
    const {movieSession, clientSessionId, proceedSuccess, proceedFailure} = this.props;
    const {chosenSeat} = this.state;
    proceedSeat(movieSession.id, clientSessionId, chosenSeat).then((response) => {
      proceedSuccess(chosenSeat, response.data)
    })
    .catch((error) => {
      getMovieSessionListById(movieSession.id).then((response) => {
        this.setState({chosenSeat: []});
        proceedFailure(response.data);
      })
    })
  }

  render() {
    const session = this.props.movieSession;
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
          className={'seat-picker-section'}
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
            <Button className={'seat-picker-proceed-button'} disabled={this.state.chosenSeat.length===0} onClick={this.onClickProceedButton}>Proceed</Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
