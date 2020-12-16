import React, { Component } from 'react';
import CinemaCard from '../CinemaCard';
import { getAllCinemas } from '../../apis/cinema';
import '../Style/commonStyle.css';
import './CinemaListPage.css';
import { Grid } from '@material-ui/core';
class index extends Component {
  componentDidMount() {
    getAllCinemas().then((response) => {
      this.props.initCinemaList(response.data);
    });
  }
  render() {
    const cinemas =
      this.props.cinemaList.length > 0 ? (
        this.props.cinemaList.map((cinema) => (
          <CinemaCard key={cinema.id} cinema={cinema} />
        ))
      ) : (
        <p className={'indicator-text'}>No available cinema</p>
      );
    return (
      <Grid container justify='center' alignItems='center'>
        <Grid container item xs={10} className={'main-content'}>
          <Grid container item xs={12} >
            <div className={'section-title'}>Cinemas</div>
          </Grid>
          <Grid container item xs={12} >
            <input type='text' className={'search-box'} placeholder='Search' />
            {cinemas}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default index;
