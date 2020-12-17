import React, { Component } from 'react';
import { Button, Grid } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import '../SeatPickerPage/SeatPickerPage.css';
import '../Style/commonStyle.css';
import EditSeatPickerTable from './EditSeatPickerTable.jsx';
import { getOrderById, editSeatPosition } from '../../apis/order';
import CircularLoading from '../Style/CircularLoading';

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
        orderResponse: {},
        chosenSeat: [],
        isValidOrder: false,
        shouldRedirect: false,
        loadingData: true,
        orderId: this.props.editSeatPickerOrderId
        }   
    }

    componentDidMount() {
        const{orderId} = this.state;
        getOrderById(orderId).then((response) => {
          this.setState({
              orderResponse: response.data,
              chosenSeat: response.data.bookedSeatIndices,
              isValidOrder: true,
              loadingData: false
          })
        });
      }

  updateChoseSeat = (seatNumber) => {
    let newChosenSeats = this.state.chosenSeat;
    if (this.state.chosenSeat.includes(seatNumber)) {
      newChosenSeats = newChosenSeats.filter((seat) => seat !== seatNumber);
    } else {
        if(this.state.chosenSeat.length===this.state.orderResponse.bookedSeatIndices.length){
            return;
        }
      newChosenSeats.push(seatNumber);
    }
    this.setState({ chosenSeat: newChosenSeats });
  };

  onClickProceedButton = () => {
    const{orderId} = this.state;
    editSeatPosition(orderId, this.state.chosenSeat).then((response) => {
        this.setState({ shouldRedirect: true });
    }).catch((exception) => {
        window.confirm("Sorry, the seat you have chosen might not be available, please choose again.")
        getOrderById(orderId).then((response) => {
            this.setState({
                orderResponse: response.data,
                chosenSeat: response.data.bookedSeatIndices,
                isValidOrder: true,
                loadingData: false
            })
          });
    } )
  }
  redirectToResultPage() {
    const{orderId} = this.state;
    return <Redirect to={'/orders/' + orderId}></Redirect>;
}  

  render() {
    const { orderResponse, shouldRedirect } = this.state;
    let session = orderResponse.movieSession;
    let startDate = '';
    let startTime = '';
    if(this.state.isValidOrder && orderResponse!==[]){
        session = orderResponse.movieSession;
        startDate = new Date(session.startTime).toLocaleDateString(
        'zh-Hans-CN'
        );
        startTime = new Date(session.startTime).toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        });
    }
    

    if (shouldRedirect) {
        return this.redirectToResultPage();
    } else { return (
        this.state.isValidOrder?
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid container item xs={10} className={'main-content'}>
          <Grid container item xs={12}>
            <Grid container className={'section-header'}>
              Seats
            </Grid>

            <Grid container className={'seat-picker-movie-name'}>
              {session.movie.name}
            </Grid>
            <Grid container className={'seat-picker-session-time'}>
              {startDate + ' ' + startTime}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid
          item
          xs={12}
          className={'seat-picker-section'}
        >
          <Grid item xs={12} className={'seat-picker-house-name'}>
            {session.house.name}
          </Grid>
          <EditSeatPickerTable
            occupied={session.occupied}
            bookedSeatIndices={orderResponse.bookedSeatIndices}
            chosenSeat={this.state.chosenSeat}
            clickedSeat={this.updateChoseSeat}
          />
          
          <Grid item xs={12} align='center'>
            <Button className={'seat-picker-proceed-button'} disabled={this.state.chosenSeat.length!==orderResponse.bookedSeatIndices.length} onClick={this.onClickProceedButton}>Proceed</Button>
          </Grid>
        </Grid>
      </Grid>
      : this.state.loadingData?(<Grid container item xs={12} justify='center'><CircularLoading/></Grid>):
      <span className={'main-content'}>Order not valid</span>
    );
  }
  }
}
