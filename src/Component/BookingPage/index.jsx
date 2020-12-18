import React, { Component } from 'react';
import {v4 as uuid} from 'uuid';
import { Redirect } from 'react-router-dom';
import { Grid} from '@material-ui/core';

import SeatPickerPage from '../SeatPickerPage'
import PaymentPage from '../PaymentPage'
import OrderCompletePage from '../OrderCompletePage'
import ProgressBar from './ProgressBar'

import { proceedSeat } from '../../apis/booking';
import { getMovieSessionListById } from '../../apis/movieSession'

import '../Style/commonStyle.css'

const SEAT_PICKER_STAGE = 1
const PAYMENT_STAGE = 2
const COMPLETE_STAGE = 3

const progressBarLength = [30, 60, 100];
class BookingPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            shouldRedirectToPrevSession : false, 
            shouldRedirectToResultPage : false,
            bookingStage : SEAT_PICKER_STAGE, //1 : seatPicker 2: payment 3: complete
            clientSessionId : uuid(),
            confirmedSeats : [],
            movieSession: this.props.movieSession,
            successOrderId : ""
        }
    }

    componentDidMount(){
        const { movieSession } = this.state;
        getMovieSessionListById(movieSession.id).then((response) => {
            this.setState({movieSession: response.data});
        })
    }

    componentWillUnmount(){
        const {movieSession, clientSessionId, confirmedSeats} = this.state;
        if(confirmedSeats.length > 0){
            proceedSeat(movieSession.id, clientSessionId, confirmedSeats);
        }
    }

    proceedSuccess = (confirmedSeats, movieSession) =>{
        this.setState({confirmedSeats, movieSession, bookingStage: PAYMENT_STAGE});
    }

    proceedFailure = (movieSession) => {
        this.setState({movieSession});
    }

    paymentComplete = (successOrderId) => {
        this.setState({
            successOrderId, 
            bookingStage : COMPLETE_STAGE
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
            return <Redirect to={previousPage}></Redirect>;
        }
        if( shouldRedirectToResultPage ){
            return <Redirect to={'/orders/'+successOrderId}></Redirect>;
        }
        return (
            <Grid container justify='center' alignItems='center'>                
            <ProgressBar value={progressBarLength[bookingStage-1]}/>
            {bookingStage !== COMPLETE_STAGE &&
            <Grid container item xs={10} className={'custom-breadcrumbs'} onClick={this.backToPrevSession}>
                Back to sessions
            </Grid>
            }
                {bookingStage === SEAT_PICKER_STAGE ?
                    <SeatPickerPage movieSession={movieSession} clientSessionId={clientSessionId} proceedSuccess={this.proceedSuccess} proceedFailure={this.proceedFailure}/>
                :bookingStage === PAYMENT_STAGE ?
                    <PaymentPage movieSession={movieSession} confirmedSeats={confirmedSeats} clientSessionId={clientSessionId} paymentComplete={this.paymentComplete} backToPrevSession={this.backToPrevSession}/>
                :   <OrderCompletePage/>
                }
            </Grid>
        )
    }
}

export default BookingPage;