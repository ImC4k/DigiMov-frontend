// import Card, CardActionArea, CardMedia  from "@material-ui/core";
// import React, { Component } from 'react';
// import './HomeCinemaCard.css';
// import { ERROR_IMAGE } from './../../assets';

import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { ERROR_IMAGE } from '../../assets';
import './HomeCinemaCard.css';
import { Grid } from "@material-ui/core";

class HomeCinemaCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: this.props.cinema.imageUrl,
            shouldRedirect: false,
        };
    }

    render() {
        return (
            <Grid container item xs={12}>
                <Grid className={'card'} container item xs={12}>
                    <Card
                        className={'custom-card'}
                    >
                        <CardActionArea>
                            <CardMedia
                                className={'card-image'}
                                src={this.state.imageUrl}
                                component='img'
                                onError={(e) => {
                                    e.target.onError = null;
                                    this.setImage(ERROR_IMAGE);
                                }}>
                            </CardMedia>
                            <div className={'overlay'}>
                                {this.props.cinema.name}
                            </div>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}

export default HomeCinemaCard;