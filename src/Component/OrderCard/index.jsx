import React, { Component } from 'react';
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
