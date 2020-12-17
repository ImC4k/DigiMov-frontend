import React, { Component } from 'react';
import {v4 as uuid} from 'uuid';
import { Redirect } from 'react-router-dom';
import { Grid} from '@material-ui/core';

import SeatPickerPage from '../SeatPickerPage'
import PaymentPage from '../PaymentPage'
import OrderCompletePage from '../OrderCompletePage'
import ProgressBar from './ProgressBar'

import { proceedSeat } from '../../apis/booking';

import '../Style/commonStyle.css'

const SEAT_PICKER = 1
const PAYMENT = 2
const COMPLETE = 3
class BookingPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            shouldRedirectToPrevSession : false, 
            shouldRedirectToResultPage : false,
            bookingStage : SEAT_PICKER, //1 : seatPicker 2: payment 3: complete
            clientSessionId : uuid(),
            confirmedSeats : [],
            movieSession: this.props.movieSession,
            successOrderId : ""
        }
    }

    componentWillUnmount(){
        const {movieSession, clientSessionId, confirmedSeats} = this.state;
        if(confirmedSeats.length > 0){
            proceedSeat(movieSession.id, clientSessionId, confirmedSeats);
        }
    }

    proceedSuccess = (confirmedSeats, movieSession) =>{
        this.setState({confirmedSeats, movieSession, bookingStage: PAYMENT});
    }

    proceedFailure = (movieSession) => {
        this.setState({movieSession});
    }

    paymentComplete = (successOrderId) => {
        this.setState({
            successOrderId, 
            bookingStage : COMPLETE
        });
        this.toggleRedirectToResultPage();
    }

    toggleRedirectToResultPage = () => { 
        setTimeout(() => { 
            this.setState({shouldRedirectToResultPage: true});
        }, 1500)
    };

    backToPrevSession = () => {
        this.setState({shouldRedirectToPrevSession : true})
    }
    
    render(){
        const { shouldRedirectToPrevSession, shouldRedirectToResultPage, bookingStage, movieSession, confirmedSeats, clientSessionId, successOrderId } = this.state;

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
        if( shouldRedirectToResultPage ){
            //expected selected movie session in redux, if not found, redirect to home
            return <Redirect to={'/orders/'+successOrderId}></Redirect>;
        }

        return (
            <Grid container justify='center' alignItems='center'>                
            <ProgressBar value={(bookingStage === SEAT_PICKER ? 30 : bookingStage === PAYMENT ? 60 :100)}/>
            {bookingStage !== COMPLETE &&
            <Grid container item xs={10} className={'custom-breadcrumbs'} onClick={this.backToPrevSession}>
                Back to sessions
            </Grid>
            }
                {bookingStage === SEAT_PICKER ?
                    <SeatPickerPage movieSession={movieSession} clientSessionId={clientSessionId} proceedSuccess={this.proceedSuccess} proceedFailure={this.proceedFailure}/>
                :bookingStage === PAYMENT ?
                    <PaymentPage movieSession={movieSession} confirmedSeats={confirmedSeats} clientSessionId={clientSessionId} paymentComplete={this.paymentComplete}/>
                :   <OrderCompletePage/>
                }
            </Grid>
        )
    }
}

export default BookingPage;