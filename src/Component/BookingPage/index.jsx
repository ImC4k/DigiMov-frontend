import React, { Component } from 'react';
import {v4 as uuid} from 'uuid';
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import ProgressBar from './ProgressBar';
import SeatPickerPage from '../SeatPickerPage'

const SEAT_PICKER = 1
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
        this.setState({confirmedSeats, movieSession});
    }

    proceedFailure = (movieSession) => {
        this.setState({movieSession});
    }

    backToPrevSession = () => {
        this.setState({shouldRedirectToPrevSession : true})
    }
    
    render(){
        const { shouldRedirectToPrevSession, bookingStage, movieSession } = this.state;

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
                <div onClick={this.backToPrevSession}>Back To Session</div>
                {bookingStage === SEAT_PICKER ?
                    <div>
                        seatPicker
                    </div>
                :
                    <div>
                        payment
                    </div>
                }
            </Grid>
        )
    }
}

export default BookingPage;