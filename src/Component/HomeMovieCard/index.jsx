import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import {Redirect} from 'react-router-dom';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { ERROR_IMAGE } from '../../assets';
import './HomeMovieCard.css';
import { Grid } from "@material-ui/core";

export default class HomeMovieCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: this.props.movie.imageUrl,
            shouldRedirect: false,
        };
    }

    setImage(imageUrl) {
        this.setState({
            imageUrl: imageUrl,
        });
    }

    onClickCard = () => {
        this.setState({shouldRedirect : true});
    }

    render() {
        const { shouldRedirect } = this.state;
        const { name, id } = this.props.movie;
        if(shouldRedirect){
            return <Redirect to= {"/movies/"+id}/>
        }
        else{
            return (
                <Grid container item xs={6}>
                    <Grid className={'card'} container item xs={12}>
                        <Card
                            className={'custom-card'}
                            onClick = {this.onClickCard}
                        >
                            <CardActionArea>
                                <CardMedia
                                    className={'card-image'}
                                    src={this.state.imageUrl}
                                    component='img'
                                    onError={(e) => {
                                        e.target.onError = null;
                                        this.setImage(ERROR_IMAGE);
                                    }}
                                />
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid className={'home-movie-card-movie-name'} container item xs={12} justify='center'>
                        {name}
                    </Grid>
                </Grid>
            )
        }
    }
}