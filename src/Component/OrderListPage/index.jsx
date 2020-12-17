import React, { Component } from 'react';
import '../Style/commonStyle.css';
import { Grid } from '@material-ui/core';
import OrderCard from '../OrderCard';

class index extends Component {
    constructor(props) {
        super(props)
        this.state = { keyword: "", loadingData: true };
    }
    render() {
        const orderList = this.props.orderList;

        const orders =
            orderList.length > 0 ?
                (orderList.map((order) => { return <OrderCard key={order.id} order={order} /> })) : (<p className={'indicator-text'}>No Matched Order.</p>);

        return (
            <Grid container justify='center'>
                <Grid container item xs={10} className={'main-content'}>
                    <Grid container item xs={12} >
                        <div className={'section-title'}>Order History</div>
                    </Grid>
                    <Grid container item xs={12} >
                        {orders}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default index;
