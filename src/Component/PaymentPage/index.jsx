import React, {Component} from 'react';

import moment from 'moment';
import { Grid } from '@material-ui/core';

class PaymentPage extends Component {
    render(){
        const {movieSession} = this.props;
        const { name, startTimeInMoment } = this.props.movieSession.movie;
        return (
            <>
            <Grid container item xs={12}>
                <div className={'section-title'}>Payment</div>
            </Grid>
            <Grid container item xs={12}>
                <div className={'movie-title'}>{name}</div>
            </Grid>
            <Grid container item xs={12}>
                {startTimeInMoment}
            </Grid>
            </>
        )
    }
}


export default PaymentPage;