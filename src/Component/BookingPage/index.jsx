import React, { Component } from 'react';
import {v4 as uuid} from 'uuid';
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';

const SEAT_PICKER = 1
class BookingPage extends Component {
    constructor(props){
        super(props);
        this.state = {
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
    
    render(){
        const { bookingStage, movieSession } = this.state;

        const shouldRedirect = movieSession === undefined;
        
        if( shouldRedirect ){
            //expected selected movie session in redux, if not found, redirect to home
            return <Redirect to={'/'}></Redirect>;
        }
        return (
            <Grid container justify='center' alignItems='center'>
                <Grid container item xs={10} className={'paper-content'}>
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
            </Grid>
        )
    }
}

export default BookingPage;