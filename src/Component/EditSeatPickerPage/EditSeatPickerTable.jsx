import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import '../SeatPickerPage/SeatPickerPage.css';
import EditSeatPickerSeat from './EditSeatPickerSeat';
export default class EditSeatPickerTable extends Component {
  clickedSeat = (seatNumber) => {
    this.props.clickedSeat(seatNumber);
  };

  rowOfSeats = (rowNumber) => {
    return Array.from(Array(10)).map((_, index) => {
      return (
        <EditSeatPickerSeat
          occupied={this.props.occupied}
          key={index}
          index={rowNumber * 10 + index}
          bookedSeatIndices={this.props.bookedSeatIndices}
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

        <Grid item container xs={12} style={{marginTop: '2%'}}>
          <Grid item container xs={3} className={'seat-picker-available-seat'} justify='center' > Available </Grid>
          <Grid item container xs={3} className={'seat-picker-sold-seat'} justify='center' > Sold </Grid>
          <Grid item container xs={3} className={'seat-picker-processing-seat'} justify='center' > In process </Grid>
          <Grid item container xs={3} className={'seat-picker-clicked-seat'} justify='center' > Selected </Grid>
        </Grid>
      </Grid>
    );
  }
}
