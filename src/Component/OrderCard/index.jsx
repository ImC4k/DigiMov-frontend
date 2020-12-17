import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { ERROR_IMAGE } from '../../assets';
import './OrderCard.css';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: this.props.order
        }
    }

    render() {
        const order = this.state.order;
        var paid = 0;
        for (var key in order.customerGroupQuantityMap) {
            paid += order.customerGroupQuantityMap[key] * order.movieSession.prices[key];
        }

        return (
            <div className={'main-card'}>
                <h2>Session</h2>
                <p>{
                    new Date(order.movieSession.startTime).toDateString()
                }</p>
                <h2>Movie</h2>
                <p>{
                    order.movieSession.movie.name
                }</p>
                <h2>Paid</h2>
                <p>{
                    paid
                }</p>
            </div>
        )
    }
}

export default index;
