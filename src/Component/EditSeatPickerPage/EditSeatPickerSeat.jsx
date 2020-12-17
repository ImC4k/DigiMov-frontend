import React, { Component } from 'react';
import CropPortraitIcon from '@material-ui/icons/CropPortrait';
import '../SeatPickerPage/SeatPickerPage.css';
import clsx from 'clsx';

export default class EditSeatPickerSeat extends Component {
  isAvailable = (seatNumber) => {
    return this.props.occupied[seatNumber] === undefined || this.props.occupied[seatNumber].status === 'available';
  };

  onClickShowSeatNumber = (seatNumber) => {
    if (this.isAvailable(seatNumber)) {
      this.props.clickedSeat(seatNumber);
    }
  };

  render() {
    let seatColorClass = '';
    const occupiedSeat = this.props.occupied[this.props.index];
    if(this.props.bookedSeatIndices.includes(this.props.index)){
        occupiedSeat.status = 'available';
    }
    
    if (occupiedSeat !== undefined) {
      if (occupiedSeat.status === 'sold') {
        seatColorClass = 'seat-picker-sold-seat';
      } else if (occupiedSeat.status === 'in process') {
        seatColorClass = 'seat-picker-processing-seat';
      } else if (occupiedSeat.status === 'available' && this.props.chosenSeat.includes(this.props.index)) {
        seatColorClass = 'seat-picker-clicked-seat';
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
