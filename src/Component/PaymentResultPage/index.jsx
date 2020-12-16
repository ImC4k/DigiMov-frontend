import "./PaymentResultPage.css";
import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import QRCode from "qrcode.react";

export default class index extends Component {
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
              112498823573592
            </Grid>
            <Grid container item xs={12}>
              <div className={"sub-section-title"}>Movie</div>
            </Grid>
            <Grid container item xs={12}>
              movieSess 
            </Grid>
            <Grid container item xs={12}>
              <div className={"sub-section-title"}>Session</div>
            </Grid>
            <Grid container item xs={12}>
              2020/9/1 21:30
            </Grid>
            <Grid container item xs={12}>
              <div className={"sub-section-title"}>House</div>
            </Grid>
            <Grid container item xs={12}>
              House 1
            </Grid>
            <Grid container item xs={12}>
              <div className={"sub-section-title"}>Seats</div>
            </Grid>
            <Grid container item xs={12}>
              F5, F6
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
