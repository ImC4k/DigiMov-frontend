import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import './SeatPickerPage.css';
import SeatPickerSeat from './SeatPickerSeat';
export default class seatPickerTable extends Component {
  clickedSeat = (seatNumber) => {
    this.props.clickedSeat(seatNumber);
  };

  rowOfSeats = (rowNumber) => {
    return Array.from(Array(10)).map((_, index) => {
      return (
        <SeatPickerSeat
          occupied={this.props.occupied}
          key={index}
          index={rowNumber * 10 + index}
          chosenSeat={this.props.chosenSeat}
          clickedSeat={this.clickedSeat}
        />
      );
    });
  };

  render() {
    const seatsNumber = Array.from(Array(11)).map((_, index) => {
      return (
        <div className={'seat-picker-table-number-label'} key={index}>
          {index > 0 ? index : ''}
        </div>
      );
    });

    const tableOfSeats = ['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(
      (label, index) => {
        return (
          <Grid container item xs={12} key={index} justify='center'>
            <div style={{ marginRight: '2%', marginTop: '1%' }}>{label}</div>
            {this.rowOfSeats(index)}
          </Grid>
        );
      }
    );

    return (
      <Grid
        container
        item
        xs={12}
        className={'seat-picker-table-house'}
        alignItems={'flex-start'}
      >
        <Grid item xs={12} className={'seat-picker-table-screen'}>
          Screen
        </Grid>
        {tableOfSeats}
        <Grid container item xs={12} justify='center' style={{marginLeft: '3%'}}>
          {seatsNumber}
        </Grid>
      </Grid>
    );
  }
}
