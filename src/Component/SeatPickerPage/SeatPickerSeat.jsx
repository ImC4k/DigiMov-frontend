import React, { Component } from 'react';
import CropPortraitIcon from '@material-ui/icons/CropPortrait';
import './SeatPickerPage.css';
import clsx from 'clsx';

export default class SeatPickerSeat extends Component {
  isAvailable = (seatNumber) => {
    return this.props.occupied[seatNumber] === undefined;
  };

  onClickShowSeatNumber = (seatNumber) => {
    if (this.isAvailable(seatNumber)) {
      this.props.clickedSeat(seatNumber);
    }
  };

  render() {
    let seatColorClass = '';
    const occupiedSeat = this.props.occupied[this.props.index];
    if (occupiedSeat !== undefined) {
      if (occupiedSeat.status === 'sold') {
        seatColorClass = 'seat-picker-sold-seat';
      } else {
        seatColorClass = 'seat-picker-processing-seat';
      }
    } else if (this.props.chosenSeat.includes(this.props.index)) {
      seatColorClass = 'seat-picker-clicked-seat';
    }

    return (
      <CropPortraitIcon
        className={clsx('seat-picker-table-available-seat', seatColorClass)}
        onClick={() => this.onClickShowSeatNumber(this.props.index)}
      ></CropPortraitIcon>
    );
  }
}
