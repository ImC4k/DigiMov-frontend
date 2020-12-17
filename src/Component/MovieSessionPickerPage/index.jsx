import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Divider, Grid, CircularProgress, Modal } from '@material-ui/core';
import '../Style/commonStyle.css';

import MovieInfoModal from '../MovieInfoModal';

import { getMovie } from '../../apis/movie';
import { getUpcomingMovieSessionListByMovieId } from '../../apis/movieSession';


import MovieSessionListContainer from '../../Container/MovieSessionPickerPageContainer/MovieSessionListContainer'
function MovieSessionPicker() {
    const movieId = useParams().id;
    const [loadingData, setLoadingData] = useState(true);
    const [movie, setMovie] = useState({});
    const [movieSessions, setMovieSession] = useState([]);

    const [open, setOpen] = useState(false);
    const [movieInfoInModal, setMovieInfoInModal] = useState({});

    
    const handleOpen = (movieInfoInModal) => {
        setOpen(true);
        setMovieInfoInModal(movieInfoInModal);
    };
    const handleClose = () => {
      setOpen(false);
    };

    let history = useHistory();

    useEffect(() => {
        if(movie.id === undefined){
            setLoadingData(true);
            console.log("fetch movie: "+movieId+"from server");
            setLoadingData(true);
            getMovie(movieId).then((response) => {
                setMovie(response.data);
            }).finally(() => {
                setLoadingData(false)
            });
        }
    }
    ,[movieId, movie])

    
    useEffect(() => {
        if(movieSessions.length === 0){
            console.log("fetch movie sessions from server");
            setLoadingData(true);
            getUpcomingMovieSessionListByMovieId(movieId).then((response) => {
                console.log(response.data)
                setMovieSession(response.data);
            }).finally(() => {
                setLoadingData(false);
            });
        }
    }
    ,   [movieId, movieSessions])
    
    return (
        <Grid container justify='center' alignItems='center'>
            <Grid container item xs={10} className='custom-breadcrumbs' onClick={() => history.push('/movies')}>
                <div>Movies /</div>
            </Grid>
            <Grid container item xs={10} className={'main-content'}>
                <Grid container item xs={12}>
                    <div className={'section-header'}>Sessions</div>
                </Grid>
                {movie.id === undefined ?(
                    loadingData ? 
                    (<Grid container item xs={12} justify="center"><CircularProgress className={'loading-cirle'}/></Grid>) : 
                    (<Grid container item xs={12}>Disconnected from server</Grid>)
                ):
                    <Grid container item xs={12}>
                        <Grid item xs={9}><div className={'section-sub-header'}>{movie.name}</div></Grid>
                        <Grid container item xs={3} onClick={() => handleOpen(movie)} className={'link-style-button'} justify='flex-end' alignItems='center'>
                            More details
                        </Grid>
                        <Grid item xs={12}><Divider className='margin-divider'/></Grid>
                        <Grid item xs={12}><MovieSessionListContainer movieSessions= {movieSessions}/></Grid>
                        
                        <Modal open={open} onClose={handleClose}>
                            <div>
                            <MovieInfoModal movie={movieInfoInModal} />
                            </div>
                        </Modal>
                    </Grid>
                }
            </Grid>
        </Grid>

    )
}
export default MovieSessionPicker;