import React, { Component } from 'react'
import { LinearProgress } from '@material-ui/core';

export default class ProgressBar extends Component {
  render() {
    return (
      <LinearProgress
        className={'booking-progress-bar'}
        variant={'determinate'}
        value={30}
      />
    )
  }
}
