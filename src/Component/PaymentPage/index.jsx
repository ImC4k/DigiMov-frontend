import React, {Component} from 'react';

import 'moment';
import _ from 'lodash';
import { Grid, Select, MenuItem, Divider, TextField, Button, Card, CardContent } from '@material-ui/core';
import {convertSeatIndexToSeatText} from '../../Utils/seatIndexUtils';
import { checkCardType, isCardExpriyDateMonthValid, isCardExpriyDateYearValid, isCreditCardCvvValid, isEmailValid, isCreditCardExpriyValid, CARD_NUMBER_LIMIT, HOLDER_NAME_LIMIT, INVALID, UNSUPPORTED_CARD } from '../../Utils/creditCardUtils'

import '../Style/commonStyle.css'
import './PaymentPage.css'

const CARD_NUMBER_ID = 'card-number';
const CARD_HOLDER_NAME_ID = 'card-holder-name'
const EMAIL_ID = 'email';
const EXPIRY_DATE_MONTH_ID = 'card-expiry-date-month';
const EXPIRY_DATE_YEAR_ID = 'card-expiry-date-year';
const CVV_ID = 'card-cvv';

const EMAIL_LIMIT = 30;
const EXPIRY_DATE_MONTH_LIMIT = 2;
const EXPIRY_DATE_YEAR_LIMIT = 2;
const CVV_LIMIT = 3;

class PaymentPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            //customerGroupQuantityMap : Object.keys(this.props.movieSession.prices).reduce((a, b) => {a[b] = 0; return a}, {}),
            totalQuantity : this.props.confirmedSeats.length,
            requestOrder : {
                movieSessionId: this.props.movieSession.id,
                bookedSeatIndices: this.props.confirmedSeats,
                customerGroupQuantityMap: Object.keys(this.props.movieSession.prices).reduce((a, b) => {a[b] = 0; return a}, {}),
                email: "",
                //userId: ObjectId, ommitted for v1
                creditCardInfo : {
                    number: "", 
                    expiryDate: {
                        month: "",
                        year: "",
                    },
                    cvv: "",
                    holderName: ""

                },
                clientSessionId: this.props.sessionId
            }
        }
    }

    handleQuantityChange = (event) => {
        const { totalQuantity } = this.state;
        var { requestOrder } = this.state;
        var {customerGroupQuantityMap} = requestOrder;

        var newQuantityTotal =  Object.keys(customerGroupQuantityMap).reduce((a, b) => (b !== event.target.name ? a + customerGroupQuantityMap[b] : a), 0) + event.target.value;

        if(newQuantityTotal > totalQuantity){
            [...Array(newQuantityTotal-totalQuantity).keys()].forEach(() =>{
                var isRemoved = false;
                _.forEach(customerGroupQuantityMap, (value, key) => {
                    if(key !== event.target.name && value > 0 && !isRemoved){
                        customerGroupQuantityMap[key] = value - 1;
                        isRemoved = true;
                    }
                })
            })
        }
        else if(newQuantityTotal < totalQuantity){
            [...Array(totalQuantity - newQuantityTotal).keys()].forEach(() =>{
                var isAdded = false;
                _.forEach(customerGroupQuantityMap, (value, key) => {
                    if(key !== event.target.name && !isAdded){
                        customerGroupQuantityMap[key] = value + 1;
                        isAdded = true;
                    }
                })
            })
        }

        customerGroupQuantityMap[event.target.name] = event.target.value; 
        requestOrder.customerGroupQuantityMap = customerGroupQuantityMap
        this.setState({requestOrder})
    }

    handleOrderChange = (event) => {
        var { requestOrder } = this.state;
        var { creditCardInfo } = requestOrder;
        
        if(event.target.id === CARD_NUMBER_ID){
            if(event.target.value.length <= CARD_NUMBER_LIMIT){
                creditCardInfo.number = event.target.value;
            }
        }
        else if(event.target.id === EMAIL_ID){
            if(event.target.value.length <= EMAIL_LIMIT){
                requestOrder.email = event.target.value;
            }
        }
        else if(event.target.id === CARD_HOLDER_NAME_ID){
            if(event.target.value.length <= HOLDER_NAME_LIMIT){
                creditCardInfo.holderName  = event.target.value;
            }
        }
        else if(event.target.id === EXPIRY_DATE_MONTH_ID){
            if(event.target.value.length <= EXPIRY_DATE_MONTH_LIMIT){
                creditCardInfo.expiryDate.month = event.target.value;
            }
        }
        else if(event.target.id === EXPIRY_DATE_YEAR_ID){
            if(event.target.value.length <= EXPIRY_DATE_YEAR_LIMIT){
                creditCardInfo.expiryDate.year = event.target.value;
            }
        }
        else if(event.target.id === CVV_ID){
            if(event.target.value.length <= CVV_LIMIT){
                creditCardInfo.cvv = event.target.value;
            }
        }

        requestOrder.creditCardInfo = creditCardInfo;
        this.setState({requestOrder});
    }

    onClickMakePaymentButton = () => {
        //todo: add api, show payment complete modal and redirect to resultPage
        console.log(this.state.requestOrder)
    }
    render(){
        const { movieSession, confirmedSeats } = this.props;
        const { movie, house, prices } = movieSession;

        const { requestOrder, totalQuantity } = this.state;
        const { customerGroupQuantityMap, creditCardInfo } = requestOrder;
        
        const startDate = new Date(movieSession.startTime).toLocaleDateString(
            'zh-Hans-CN'
        );
        const startTime = new Date(movieSession.startTime).toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
        });
        const pickedSeat = confirmedSeats.map(seatIndex => {
            return <span>{convertSeatIndexToSeatText(seatIndex)}</span>
        })

        const renderQuantityList = (size) => {
            return [...Array(size).keys()].map(quantity => {
                return <MenuItem key={"menu-item-"+quantity} value={quantity}>{quantity}</MenuItem>
            })
        }

        const calculateSubtotal = (priceType) => {
            return prices[priceType]*customerGroupQuantityMap[priceType]
        }

        const calculateTotal = () => {
            return Object.keys(customerGroupQuantityMap)
            .map(ticketType => 
                (calculateSubtotal(ticketType))
            )
            .reduce((total, subTotal) =>
                (total + subTotal),
                0
            )
        }


        const quantityPickerList = (Object.keys(prices).map(priceType => {
            return <>
                <Grid container item xs={12} className={'payment-price-type'}>
                    {priceType}
                </Grid>
                <Grid container item xs={12}>
                    <Grid container item xs={4} className={'payment-price'}>
                        ${prices[priceType]}  
                    </Grid>
                    <Grid container item xs={4} className={'payment-price'}>
                        <Select
                            id={priceType}
                            name={priceType}
                            value={customerGroupQuantityMap[priceType]}
                            onChange={this.handleQuantityChange}
                        >
                        {renderQuantityList(totalQuantity + 1)/*add 1 for showing item of 0 */}
                        </Select>
                    </Grid>
                        
                    <Grid container item xs={4} className={'payment-price'}>
                        <span>${calculateSubtotal(priceType)}</span>
                    </Grid>
                </Grid>
                <Divider/>
            </>
        })
        )

        const isCreditCardNumberError = checkCardType(creditCardInfo.number) === INVALID || checkCardType(creditCardInfo.number) === UNSUPPORTED_CARD;
        const isSeatPicked = totalQuantity === Object.keys(customerGroupQuantityMap).reduce((a, b) => (a + customerGroupQuantityMap[b]), 0);
        const isEnablePayment = isSeatPicked && totalQuantity === this.props.confirmedSeats.length && creditCardInfo.holderName.length > 0 && isEmailValid(requestOrder.email) && !isCreditCardNumberError && isCreditCardExpriyValid(creditCardInfo.expiryDate.month, creditCardInfo.expiryDate.year) && isCreditCardCvvValid(creditCardInfo.cvv);
        return (
                <Grid container item xs={12} className={'main-content'}>
                    <Grid container item xs={12}className={'section-header'}>
                        Payment
                    </Grid>
                    <Grid container item xs={12} className={'movie-title'}>
                        {movie.name}
                    </Grid>
                    
                    <Grid container item xs={12}>
                        <Grid container item xs={4} className={'payment-session-time'}>
                            {startDate}
                            
                        </Grid>
                        <Grid container item xs={2} className={'payment-session-time'}>
                            {startTime}
                        </Grid>
                        <Grid container item xs={3} className={'payment-session-house'}>
                            {house.name}
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                            All seat picked: {isSeatPicked?"TRUE":"FALSE"}
                        <Grid container item xs={4} className={'payment-picked-seat-text'}>
                            Picked Seat: 
                        </Grid>
                        <Grid container item xs={4} className={'payment-picked-seat'}>
                            {pickedSeat}
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Card className={'payment-quantity-picker-card'}>
                            <CardContent>
                                {quantityPickerList}
                                
                                <Grid container item xs={12}>
                                    Total: <span>${calculateTotal()}</span>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid container item xs={12}>
                        <TextField 
                            id={EMAIL_ID}
                            label="Email" 
                            value={requestOrder.email}
                            onChange={this.handleOrderChange}
                            error={requestOrder.email.length > 0 && !isEmailValid(requestOrder.email)}
                            required
                            fullWidth
                        ></TextField>
                    </Grid>
                    cardType{checkCardType(creditCardInfo.number)}
                    <Grid container item xs={12}>
                        <Grid container item xs={12}>
                            <TextField 
                                id={CARD_HOLDER_NAME_ID}
                                label="Card Holder"
                                value={creditCardInfo.holderName}
                                onChange={this.handleOrderChange}
                                required
                            ></TextField>
                        </Grid>
                        <Grid container item xs={12}>
                            <TextField 
                                id={CARD_NUMBER_ID}
                                label="Credit Card number"
                                value={creditCardInfo.number}
                                onChange={this.handleOrderChange}
                                error={creditCardInfo.number.length > 0 && isCreditCardNumberError}
                                required
                            ></TextField>
                        </Grid>
                        expiryDateValid: {isCreditCardExpriyValid(creditCardInfo.expiryDate.month, creditCardInfo.expiryDate.year)?"True":"False"}
                        <Grid container item xs={12}>
                            <Grid container item xs={6}> 
                                <Grid container item xs={2}>
                                    <TextField 
                                        id={EXPIRY_DATE_MONTH_ID} 
                                        label="MM" 
                                        value={creditCardInfo.expiryDate.month}
                                        onChange={this.handleOrderChange}
                                        error={creditCardInfo.expiryDate.month.length > 0 && !isCardExpriyDateMonthValid(creditCardInfo.expiryDate.month)}
                                        required
                                    ></TextField>
                                </Grid>
                                <Grid container item xs={2}>/</Grid>
                                <Grid container item xs={2}>
                                    <TextField 
                                    id={EXPIRY_DATE_YEAR_ID}
                                    label="YY" 
                                    value={creditCardInfo.expiryDate.year}
                                    onChange={this.handleOrderChange}
                                    error={creditCardInfo.cvv.length > 0 && !isCardExpriyDateYearValid(creditCardInfo.expiryDate.year)}
                                    required
                                ></TextField>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}> 
                                <TextField 
                                    id={CVV_ID}
                                    label="CVV" 
                                    value={creditCardInfo.cvv}
                                    onChange={this.handleOrderChange}
                                    error={creditCardInfo.cvv.length > 0 && !isCreditCardCvvValid(creditCardInfo.cvv)}
                                    required
                                ></TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider variant="middle"/>
                    <Grid item xs={12} align='center' className={'payment-proceed-button-section'}>
                        <Button color="primary" disabled={!isEnablePayment} onClick={this.onClickMakePaymentButton}>Make payment</Button>
                    </Grid>
                </Grid>
        )
    }
}


export default PaymentPage;