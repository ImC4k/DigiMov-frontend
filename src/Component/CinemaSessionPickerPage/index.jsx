import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Divider, Grid } from '@material-ui/core';
import '../Style/commonStyle.css';

import { getCinema } from '../../apis/cinema';
import { getUpcomingMovieSessionListByCinemaId } from '../../apis/movieSession';
import CircularLoading from '../Style/CircularLoading';

import MovieSessionListContainer from '../../Container/CinemaSessionPickerPageContainer/MovieSessionListContainer'

function CineamSessionPicker() {
    const cinemaId = useParams().id;
    const [loadingData, setLoadingData] = useState(true);
    const [cinema, setCinema] = useState(
        useSelector((state) => state.cinemas[cinemaId])
    );
    const [movieSessions, setMovieSession] = useState([]);
    
    let history = useHistory();
    useEffect(() => {
        if (cinema === undefined) {
            console.log(
                'Cinema' + cinemaId + ' not in redux, fetch from server'
            );
            getCinema(cinemaId).then((response) => {
                //Todo: Enhancement update fetched movie to redux
                setCinema(response.data);
            })
        }
       if(movieSessions.length === 0){
        
        getUpcomingMovieSessionListByCinemaId(cinemaId).then((response) => {
            //Todo: Enhancement update fetched movie to redux
            setMovieSession(response.data);
            setLoadingData(false);
        });
       
    }

    },  [cinema, movieSessions.length, cinemaId]);
    
    return (
        <Grid container justify='center' alignItems='center'>
            <Grid container item xs={10} className='custom-breadcrumbs' onClick={() => history.push('/cinemas')}>
                <div>Cinemas /</div>
            </Grid>
            <Grid container item xs={10} className={'main-content'}>
                <Grid container item xs={12}>
                    <div className={'section-header'}>Movies on Show</div>
                </Grid>

                { loadingData ? <Grid container item xs={12} justify="center"><CircularLoading /></Grid> : (
                    cinema === undefined ? <Grid container item xs={12}>Disconnected from server</Grid> : (
                        
                    <Grid container item xs={12}>
                        <Grid item xs={12}><div className={'section-sub-header'}>{cinema.name}</div></Grid>
                        <Grid item xs={12}><Divider className='margin-divider'/></Grid>
                        { movieSessions.length === 0 ? <div>No available sessions</div> : <Grid item xs={12}><MovieSessionListContainer movieSessions= {movieSessions}/></Grid>}
                    </Grid>
                ))}
                
            </Grid>
        </Grid>
    );
}

export default CineamSessionPicker;
