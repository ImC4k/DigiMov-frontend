import { Button, Divider, Grid, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import { getOrder } from './../../apis/order';
import { Redirect } from 'react-router-dom';
import './SearchOrderPage.css';

const CARD_NUMBER_ID = 'card-number';
const EMAIL_ID = 'email';

const EMAIL_LIMIT = 30;
const CARD_NUMBER_LIMIT = 16;

class SearchOrderPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      params: {
        cardNumber: '',
        email: '',
      },
      shouldRedirect: false,
    };
  }

  handleInputChange = (event) => {
    var { params } = this.state;

    if (event.target.id === CARD_NUMBER_ID) {
      if (event.target.value.length <= CARD_NUMBER_LIMIT) {
        params.cardNumber = event.target.value;
      }
    } else if (event.target.id === EMAIL_ID) {
      if (event.target.value.length <= EMAIL_LIMIT) {
        params.email = event.target.value;
      }
    }
    this.setState({ params });
  };

  submit = () => {
    getOrder(this.state.params.email, this.state.params.cardNumber).then(
      (response) => {
        this.props.getOrderListByCardAndEmail(response.data);
        if (response.data.length > 0) {
          this.setState({ shouldRedirect: true });
        }
      }
    );
  };

  render() {
    var { params, shouldRedirect } = this.state;
    if (shouldRedirect) {
      return <Redirect to={'/orders'}></Redirect>;
    } else {
      return (
        <Grid container item justify='center' alignItems='center' xs={12}>
          <Grid container item xs={10} className={'main-content'} justify='center'>
            <Grid container item xs={12} className={'section-header'}>
              Manage Orders
            </Grid>

            <Grid container justify={'center'} item xs={12} className={'search-order-input-container'}>
                <Grid container item xs={12}>
                  <TextField
                    id={CARD_NUMBER_ID}
                    label='Card Number'
                    value={params.cardNumber}
                    onChange={this.handleInputChange}
                    fullWidth={true}
                    required
                    className={'search-order-input'}
                  ></TextField>
                </Grid>
                <Grid container item xs={12}>
                  <TextField
                    id={EMAIL_ID}
                    label='Email Address'
                    value={params.email}
                    onChange={this.handleInputChange}
                    fullWidth={true}
                    required
                    className={'search-order-input'}
                  ></TextField>
                </Grid>
            </Grid>

            <Divider variant='middle' />

            <Grid item xs={12} align='center'>
              <Button className={'search-orders-button'} onClick={this.submit}>
                Search Orders
              </Button>
            </Grid>

          </Grid>
        </Grid>
      );
    }
  }
}

export default SearchOrderPage;
