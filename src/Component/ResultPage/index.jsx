import './PaymentResultPage.css';
import '../Style/commonStyle.css';
import React, { useState, useEffect } from 'react';
import { useParams, useHistory} from 'react-router-dom';
import { Grid, Button, CircularProgress } from '@material-ui/core';
import QRCode from 'qrcode.react';
import moment from 'moment';

import { getOrderById } from '../../apis/order';

import { convertSeatIndexToSeatText } from '../../Utils/seatIndexUtils'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
const { REACT_APP_BACKEND_API } = process.env;

const PaymentRequestPage = ({setOrderId}) => {
    let history = useHistory();
    const orderId = useParams().id;
    const windowDimensions = getWindowDimensions();

    const [isLoadingData, setIsLoadingData] = useState(true);
    const [order, setOrder] = useState({});
    const [isUpdateOrder, setIsUpdateOrder] = useState(true);
    const [isValidOrder, setIsInValidOrder] = useState(false);

    const onClickEditSeatButton = () =>{
      //Todo: set order to edit seat redux
      setOrderId(orderId);
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
        <Grid container item xs={10} className={'main-content'}>
          <Grid container item xs={12} alignItems='center'>
            <Grid container item xs={8}>
              <div className={'section-title'}>Booking Info</div>
            </Grid>
            <Grid container item xs={4} justify={'flex-end'}>
              <Button className={'edit-seat-button'} onClick={onClickEditSeatButton}>Edit Seats</Button>
            </Grid>
          </Grid>

          <Grid container item xs={12} className={'result-item-container'}>
            <Grid container item xs={12} className={'result-item-title'}>Reference No.</Grid>
            <Grid container item xs={12} className={'payment-price'}>{order.id}</Grid>
          </Grid>

          <Grid container item xs={12} className={'result-item-container'}>
            <Grid container item xs={12} className={'result-item-title'}>Movie</Grid>
            <Grid container item xs={12} className={'payment-price'}>{movieSession.movie.name}</Grid>
          </Grid>
          
          <Grid container item xs={12} className={'result-item-container'}>
            <Grid container item xs={12} className={'result-item-title'}>Session</Grid>
            <Grid container item xs={12} className={'payment-price'}>{moment(movieSession.startTime).format('YYYY/MM/DD HH:mm').toString()}</Grid>
          </Grid>

          <Grid container item xs={12} className={'result-item-container'}>
            <Grid container item xs={12} className={'result-item-title'}>House</Grid>
            <Grid container item xs={12} className={'payment-price'}>{movieSession.house.name}</Grid>
          </Grid>

          <Grid container item xs={12} className={'result-item-container'}>
            <Grid container item xs={12} className={'result-item-title'}>Seats</Grid>
            <Grid container item xs={12} className={'payment-price'}>{order.bookedSeatIndices.map(convertSeatIndexToSeatText).join(', ')}</Grid>
          </Grid>

          <Grid container item xs={12} className={'result-item-container'}>
            <Grid container item xs={12} className={'result-item-title'}>Payment</Grid>
            {Object.keys(movieSession.prices).map((priceType) => {
                return (
                <Grid container item xs={12} key={priceType}>
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
                );
            })}
            </Grid>


          <Grid container item xs={12} className={'result-item-container'}>
            <Grid container item xs={8}>
              <div className={'result-item-title'}>Total</div>
            </Grid>
            <Grid container item xs={4}>
              <div>
                $
                {Object.keys(customerGroupQuantityMap)
                  .map((ticketType) => calculateSubtotal(ticketType))
                  .reduce((total, subTotal) => total + subTotal, 0)}
              </div>
            </Grid>
          </Grid>
          <Grid container item xs={12} className={'result-item-container'}>
            <div className={'result-item-title'}>Digi-ticket</div>
          </Grid>
          <Grid container item xs={12}>
            <QRCode
              size={windowDimensions.width * 0.8}
              value={REACT_APP_BACKEND_API + 'orders/' + orderId}
              className='qrcode'
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default PaymentRequestPage;
