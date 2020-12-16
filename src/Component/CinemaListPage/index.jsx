import React, { Component } from 'react';
import CinemaCard from '../CinemaCard';
import { getAllCinemas } from '../../apis/cinema';
import '../Style/commonStyle.css';
import './CinemaListPage.css';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
class index extends Component {
  constructor(props) {
    super(props)
    this.state = { keyword: "", loadingData: true };
  }
  componentDidMount() {
    getAllCinemas().then((response) => {
      this.props.initCinemaList(response.data);
      this.setState({loadingData: false});
    });
  }
  changeKeyWord = (event) => {
    this.setState({ keyword: event.target.value })
  }
  render() {
    const keyword = this.state.keyword;
    var filteredCinemaList = this.props.cinemaList;
    if (keyword !== "") {
      filteredCinemaList = filteredCinemaList.filter(cinema => 
        cinema.name.toLowerCase().includes(keyword.toLowerCase())
      )
    }

    const cinemas =
      filteredCinemaList.length > 0 ? 
        (filteredCinemaList.map((cinema) => { return <CinemaCard key={cinema.id} cinema={cinema} /> })) : 
        (this.state.loadingData ? 
          (<Grid container item xs={12} justify='center'><CircularProgress className={'loading-cirle'}/></Grid>) : 
          (<p className={'indicator-text'}>No available cinema</p>));

    return (
      <Grid container justify='center' alignItems='center'>
        <Grid container item xs={10} className={'main-content'}>
          <Grid container item xs={12} >
            <div className={'section-title'}>Cinemas</div>
          </Grid>
          <Grid container item xs={12} >
            <input type='text' className={'search-box'} placeholder='Search' onChange={this.changeKeyWord} />
            {cinemas}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default index;
