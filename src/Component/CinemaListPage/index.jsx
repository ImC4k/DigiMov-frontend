import React, { Component } from 'react';
import CinemaCard from '../CinemaCard';
import { getAllCinemas } from '../../apis/cinema';
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
        <p>No available cinema</p>
      );
    return (
      <div>
        <p>Cinemas</p>
        <input type='text' placeholder='Search' />
        <br />
        {cinemas}
      </div>
    );
  }
}

export default index;
