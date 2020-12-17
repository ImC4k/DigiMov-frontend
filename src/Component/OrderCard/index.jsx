import React, { Component } from 'react';
import './OrderCard.css';
import { Grid } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: this.props.order,
      shouldRedirect: false,
    };
  }

  redirectTo(order) {
    this.setState({ shouldRedirect: true });
  }

  render() {
    var { shouldRedirect } = this.state;
    if (shouldRedirect) {
      return <Redirect to={'/orders/' + this.state.order.id}></Redirect>;
    } else {
      const order = this.state.order;
      var paid = 0;
      for (var key in order.customerGroupQuantityMap) {
        paid +=
          order.customerGroupQuantityMap[key] * order.movieSession.prices[key];
      }

      return (
        <Grid container item xs={12} className={'order-card'} onClick={() => this.redirectTo(order)}>
          <Grid container item xs={10}>

            <Grid container item xs={12} className={'order-card-section'}>
              <Grid container item xs={12} className={'order-card-title'}>Session</Grid>
              <Grid container item xs={12} className={'order-card-content'}>{new Date(order.movieSession.startTime).toDateString()}</Grid>
            </Grid>

            <Grid container item xs={12} className={'order-card-section'}>
              <Grid container item xs={12} className={'order-card-title'}>Movie</Grid>
              <Grid container item xs={12} className={'order-card-content'}>{order.movieSession.movie.name}</Grid>
            </Grid>

            <Grid container item xs={12} className={'order-card-section'}>
              <Grid container item xs={12} className={'order-card-title'}>Paid</Grid>
              <Grid container item xs={12} className={'order-card-content'}>${paid}</Grid>
            </Grid>

          </Grid>
          <Grid container item xs={2} alignItems='center' justify='center'>
            <ArrowForwardIosIcon className={'order-card-arrow-icon'}/>
          </Grid>
        </Grid>
      );
    }
  }
}

export default index;
