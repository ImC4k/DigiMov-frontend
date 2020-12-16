import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { ERROR_IMAGE } from '../../assets';
import { Grid, Chip } from '@material-ui/core';
import './MovieCard.css';
import '../Style/commonStyle.css'

class index extends Component {
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
    toggleMovieCard() {
        this.setState({ shouldRedirect: true });
    }
    redirectToMovieSessionPicker(movieId) {
        return <Redirect to={'/movies/' + movieId}></Redirect>;
    }
    onClickMoreDetails(){
        this.props.onClickMoreDetails(this.props.movie);
    }

    render() {
        const { shouldRedirect } = this.state;
        const { name, genres, language, director, id } = this.props.movie;
        if (shouldRedirect) {
            return this.redirectToMovieSessionPicker(id);
        } else {
            return (
                <Grid className={'movie-card'} container justify='center' alignItems='center'>
                    <Grid container item xs={5}>
                        <img className={'movie-image'}
                            alt={ERROR_IMAGE}
                            src={this.state.imageUrl}
                            component='img'
                            onError={(e) => {
                                e.target.onError = null;
                                this.setImage(ERROR_IMAGE);
                        }}/>
                    </Grid>
                    <Grid container item xs={7} className={'movie-info'}>
                        <Grid container item xs={12} className={'movie-info-name'}>
                            {name}
                        </Grid>
                        <Grid container item xs={12} className={'movie-info-title'}>
                            Genre
                        </Grid>
                        <Grid container item xs={12} className={'movie-info-content'}>
                            {genres.map(genre=><div key={genre} className={'movie-info-genre'}>{genre.name}</div>)}
                        </Grid>
                        <Grid container item xs={12} className={'movie-info-title'}>
                            Language
                        </Grid>
                        <Grid container item xs={12} className={'movie-info-content'}>
                            {language}
                        </Grid>
                        <Grid container item xs={12} className={'movie-info-title'}>
                            Director
                        </Grid>
                        <Grid container item xs={12} className={'movie-info-content'}>
                            {director}
                        </Grid>
                        <Grid container item xs={12} className={'movie-info-content'}>
                            <Grid container item xs={6} className={'link-style-button'} onClick={() => this.toggleMovieCard()}>Book tickets</Grid>
                            <Grid container item xs={6} className={'link-style-button'} onClick={() => this.onClickMoreDetails()}>More detail</Grid>
                        </Grid>
                    </Grid>
                </Grid>
                
            );
        }
    }
}

export default index;
