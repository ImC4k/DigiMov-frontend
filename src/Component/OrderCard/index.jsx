import React, { Component } from 'react';
import './OrderCard.css';
import { Redirect } from 'react-router-dom';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: this.props.order,
            shouldRedirect: false
        }
    }

    redirectTo(order) {
        this.setState({ shouldRedirect: true });
    }

    render() {
        var { shouldRedirect } = this.state;
        if (shouldRedirect) {
            return <Redirect to={'/orders/' + this.state.order.id}></Redirect>;
        }
        else {
            const order = this.state.order;
            var paid = 0;
            for (var key in order.customerGroupQuantityMap) {
                paid += order.customerGroupQuantityMap[key] * order.movieSession.prices[key];
            }

            return (
                <div className={'main-card'} onClick={() => this.redirectTo(order)}>
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
}

export default index;
