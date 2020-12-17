import React, { Component } from 'react';
import { getAllMovies } from './../../apis/movie';
import './HomePage.css'
import { Grid } from '@material-ui/core';
import MovieCard from '../HomeMovieCard/index';
import { getAllCinemas } from './../../apis/cinema';
import CinemaCard from '../CinemaCard';

export default class HomePage extends Component {
    componentDidMount() {
        getAllMovies().then((response) => {
            this.props.initMovieList(response.data);
        });
        getAllCinemas().then((response) => {
            this.props.initCinemaList(response.data);
        })
    }

    render() {
        const movies = this.props.movieList.length > 0 ? (
            this.props.movieList.slice(0, 4).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))
        ) : (<p className={'indicator-text'}>No available movie</p>);

        const cinemas =
            this.props.cinemaList.length > 0 ? (
                this.props.cinemaList.slice(0, 4).map((cinema) => (
                    <Grid key={cinema.id} className={'card'} container item xs={9}>
                        <CinemaCard cinema={cinema} />
                    </Grid>
                ))
            ) : (<p className={'indicator-text'}>No available cinema</p>);

        return (
            <Grid container justify='center' alignItems='center' className={'information'}>
                <Grid container item xs={10} className={'paper-content'}>
                    <Grid container item xs={12} >
                        <Grid container item xs={8} >
                            <div className={'section-title'}>New Movies</div>
                        </Grid>
                        <Grid className={'section-more'} container item xs={4} >
                            <a href="https://www.w3schools.com">More</a>
                        </Grid>
                    </Grid>
                    <Grid container item justify='center' alignItems='center' xs={12} >
                        {movies}
                    </Grid>
                    <Grid container item xs={12} >
                        <Grid container item xs={8} >
                            <div className={'section-title'}>Cinemas</div>
                        </Grid>
                        <Grid className={'section-more'} container item xs={4} >
                            <a href="/cinemas">More</a>
                        </Grid>
                    </Grid>
                    <Grid container item justify='center' alignItems='center' xs={12} >
                        <Grid item xs={12}>
                            <Grid className={'scrolling-wrapper'} >
                                <div style={{
                                    padding: "0 5%"
                                }}>
                                    {cinemas}
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}