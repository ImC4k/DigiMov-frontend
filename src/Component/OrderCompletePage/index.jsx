import React, { Component } from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Grid } from '@material-ui/core';
import './OrderCompletePage.css';

class index extends Component {
    render() {
        return (
            <Grid container justify='center' alignItems='center'>
                <Grid container item xs={10} className={'main-content'}>
                <Grid container item  justify='center' alignItems='center' xs={12} >
                    <CheckCircleIcon className={'check-circle-icon'}/>
                </Grid>
                <Grid container item justify='center' alignItems='center' xs={12} >
                    <span className={'order-complete-message'}>Order Completed!</span>
                </Grid>
                <Grid container item justify='center' alignItems='center' xs={12} >
                    <span className={'order-complete-message'}>You will be redirected to order page</span>
                </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default index;