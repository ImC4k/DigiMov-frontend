import React, { Component } from 'react';
import {v4 as uuid} from 'uuid';
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import SeatPickerPage from '../SeatPickerPage'
import PaymentPage from '../PaymentPage'

import '../Style/commonStyle.css'

const SEAT_PICKER = 1
const PAYMENT = 2
class BookingPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            shouldRedirectToPrevSession : false, 
            bookingStage : SEAT_PICKER, //1 : seatPicker 2: payment
            sessionId : uuid(),
            confirmedSeats : [],
            movieSession: this.props.movieSession
        }
    }
    proceedSuccess = (confirmedSeats, movieSession) =>{
        this.setState({confirmedSeats, movieSession, bookingStage: PAYMENT});
    }

    proceedFailure = (movieSession) => {
        this.setState({movieSession});
    }

    backToPrevSession = () => {
        this.setState({shouldRedirectToPrevSession : true})
    }
    
    render(){
        const { shouldRedirectToPrevSession, bookingStage, movieSession, confirmedSeats, sessionId } = this.state;

        const { previousPage } = this.props;

        const shouldRedirectToHome = movieSession === undefined;
        
        if( shouldRedirectToHome ){
            //expected selected movie session in redux, if not found, redirect to home
            return <Redirect to={'/'}></Redirect>;
        }
        if( shouldRedirectToPrevSession ){
            //expected selected movie session in redux, if not found, redirect to home
            return <Redirect to={previousPage}></Redirect>;
        }

        return (
            <Grid container justify='center' alignItems='center'>
                {bookingStage === SEAT_PICKER ?
                    <SeatPickerPage movieSession={movieSession} proceedSuccess={this.proceedSuccess} proceedFailure={this.proceedFailure}/>
                :
                    <PaymentPage movieSession={movieSession} confirmedSeats={confirmedSeats} sessionId={sessionId}/>
                }
            </Grid>
        )
    }
}

export default BookingPage;