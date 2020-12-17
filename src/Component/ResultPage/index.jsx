import './PaymentResultPage.css';
import '../Style/commonStyle.css'
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Grid, Button, CircularProgress } from '@material-ui/core';
import QRCode from 'qrcode.react';
import moment from 'moment';

import { getOrderById } from '../../apis/order';

import { convertSeatIndexToSeatText } from '../../Utils/seatIndexUtils'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const PaymentRequestPage = () => {
    let history = useHistory();
    const orderId = useParams().id;
    const windowDimensions = getWindowDimensions();

    const [isLoadingData, setIsLoadingData] = useState(true);
    const [order, setOrder] = useState({});
    const [isUpdateOrder, setIsUpdateOrder] = useState(true);
    const [isValidOrder, setIsInValidOrder] = useState(false);

    const onClickEditSeatButton = () =>{
      //Todo: set order to edit seat redux
      history.push('/editseatpicker');
    }

    useEffect(() => {
        getOrderById(orderId).then((response) => {
            setOrder(response.data);
            setIsInValidOrder(true);
            setIsLoadingData(false);
        });
        setIsUpdateOrder(false);
    }, [isUpdateOrder, orderId]);

    const { movieSession, customerGroupQuantityMap } = order;
    

    const calculateSubtotal = (priceType) => {
        return movieSession.prices[priceType] * customerGroupQuantityMap[priceType]
    }
    
    if(isLoadingData){
        return(
            <Grid container item xs={12} justify="center"><CircularProgress className={'loading-cirle'}/></Grid>
        )
    }

    if(!isValidOrder){
      //network error/ not found
      return (
        <Grid container justify='center' alignItems='center'>
          <Grid container item xs={10} className={'paper-content'}>
            <div>Invalid Order</div>
          </Grid>
        </Grid>
      )
    }


    //can get data
    return (
        <div>
            <Grid container justify='center' alignItems='center'>
                <Grid container item xs={10} className={'paper-content'}>
                    <Grid container item xs={12}>
                      <Grid container item xs={8}>
                        <div className={'section-title'}>Booking Info</div>
                      </Grid>
                      <Grid container item xs={4}>
                        <Button onClick={onClickEditSeatButton}>Edit Seats</Button>
                      </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <div className={'sub-section-title'}>Reference No.</div>
                    </Grid>
                    <Grid container item xs={12}>
                        {order.id}
                    </Grid>
                    <Grid container item xs={12}>
                        <div className={'sub-section-title'}>Movie</div>
                    </Grid>
                    <Grid container item xs={12}>
                        {movieSession.movie.name}
                    </Grid>
                    <Grid container item xs={12}>
                        <div className={'sub-section-title'}>Session</div>
                    </Grid>
                    <Grid container item xs={12}>
                        {moment(movieSession.startTime)
                            .format('YYYY/MM/DD HH:mm')
                            .toString()}
                    </Grid>
                    <Grid container item xs={12}>
                        <div className={'sub-section-title'}>House</div>
                    </Grid>
                    <Grid container item xs={12}>
                        {movieSession.house.name}
                    </Grid>
                    <Grid container item xs={12}>
                        <div className={'sub-section-title'}>Seats</div>
                    </Grid>
                    <Grid container item xs={12}>
                        {order.bookedSeatIndices.map(convertSeatIndexToSeatText).join(', ')}
                    </Grid>
                    <Grid container item xs={12}>
                        <div className={'sub-section-title'}>Payment</div>
                    </Grid> 
                    {Object.keys(movieSession.prices).map(priceType => {
                        return <Grid container item xs={12} key={priceType}>
                                <Grid container item xs={4} className={'payment-price'}>
                                    {priceType}
                                </Grid>
                                <Grid container item xs={2} className={'payment-price'}>
                                    {customerGroupQuantityMap[priceType]}x 
                                </Grid>
                                <Grid container item xs={2} className={'payment-price'}>
                                    ${movieSession.prices[priceType]}  
                                </Grid>
                                <Grid container item xs={4} className={'payment-price'}>
                                    <span>${calculateSubtotal(priceType)}</span>
                                </Grid>
                            </Grid>
                        
                    })}
                    <Grid container item xs={12}>
                        <Grid container item xs={8}>
                            <div className={'sub-section-title'}>Total</div>
                        </Grid> 
                        <Grid container item xs={4}>
                            <div>
                            ${Object.keys(customerGroupQuantityMap)
                                .map(ticketType => 
                                    (calculateSubtotal(ticketType))
                                )
                                .reduce((total, subTotal) =>
                                    (total + subTotal),
                                    0
                                )}
                            </div>
                        </Grid>
                    </Grid> 
                    <Grid container item xs={12}>
                        <div className={'sub-section-title'}>Digi-ticket</div>
                    </Grid>
                    <Grid container item xs={12}>
                      <QRCode
                          size={windowDimensions.width*.8}
                          value='http://facebook.github.io/react/'
                          className='qrcode'
                      />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default PaymentRequestPage;
