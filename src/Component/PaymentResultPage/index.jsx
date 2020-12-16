import "./PaymentResultPage.css";
import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import QRCode from "qrcode.react";
import moment from 'moment';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {order: {
            id: 123,
            email: "a@a.com",
            userId: 123,
            bookedSeatIndices: [1,2],
            customerGroupQuantityMap: {
                "Adult": 1,
                "Children": 1
            },
            movieSession: {
                id: '5fd760d56500c940f174f4b0',
                movie: {
                    id: '5fd760d56500c940f174f4a0',
                    name: 'Beyond the dream',
                    duration: 100,
                    genres: [
                        {
                            id: '5fd760d56500c940f174f4a0',
                            name: 'Romance',
                        },
                    ],
                    director: 'Kiwi Chow',
                    description: 'I go to school by bus',
                    imageUrl:
                        'https://wmoov.com/assets/movie/photo/201912/FB_IMG_1576452551183_1576574597.jpg',
                    rating: 'IIA',
                    cast: ['ME', 'Them'],
                    language: 'Cantonese',
                },
                house: {
                    id: '5fd760d56500c940f174f4a01',
                    cinemaId: '5fd760d56500c940f174f4b2',
                    name: 'House 1',
                    capacity: 100,
                },
                startTime: 1608018165676,
                prices: {
                    Adult: 100,
                    Student: 60,
                },
                occupied: {},
                occupancyCount: 1,
            },
            creditCardNumber: "1234",
        }};
    }
  render() {
    return (
      <div>
        <Grid container justify="center" alignItems="center">
          <Grid container item xs={10} className={"paper-content"}>
            <Grid container item xs={12}>
              <div className={"section-title"}>Booking Info</div>
            </Grid>
            <Grid container item xs={12}>
              <div className={"sub-section-title"}>Reference No.</div>
            </Grid>
            <Grid container item xs={12}>
              {this.state.order.id}
            </Grid>
            <Grid container item xs={12}>
              <div className={"sub-section-title"}>Movie</div>
            </Grid>
            <Grid container item xs={12}>
              {this.state.order.movieSession.movie.name}
            </Grid>
            <Grid container item xs={12}>
              <div className={"sub-section-title"}>Session</div>
            </Grid>
            <Grid container item xs={12}>
             {moment(this.state.order.movieSession.startTime).format('YYYY/MM/DD HH:mm').toString()}
            </Grid>
            <Grid container item xs={12}>
              <div className={"sub-section-title"}>House</div>
            </Grid>
            <Grid container item xs={12}>
              {this.state.order.movieSession.house.name}
            </Grid>
            <Grid container item xs={12}>
              <div className={"sub-section-title"}>Seats</div>
            </Grid>
            <Grid container item xs={12}>
              {this.state.order.bookedSeatIndices.join(', ')}
            </Grid>
            <Grid container item xs={12}>
              <div className={"sub-section-title"}>Digi-ticket</div>
            </Grid>
            <Grid container item xs={12}>
              <div className={"qrcode"}>
                <QRCode
                  includeMargin
                  size="250"
                  value="http://facebook.github.io/react/"
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
