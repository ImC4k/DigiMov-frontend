import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';


export default class CircularLoading extends Component {
  render() {
    return (
      <CircularProgress className={'loading-cirle'}/>
    )
  }
}
