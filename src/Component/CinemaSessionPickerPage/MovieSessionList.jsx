import React from 'react';
import { Grid, Divider, Modal } from '@material-ui/core';
import moment from 'moment';
import { useHistory } from 'react-router-dom';


import MovieInfoModal from '../MovieInfoModal';

function MovieSessionList({ movieSessions, newBookingSession }) {
    let history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [movieInfoInModal, setMovieInfoInModal] = React.useState({});

    const handleOpen = (movieInfoInModal) => {
        setOpen(true);
        setMovieInfoInModal(movieInfoInModal);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const movieMap = {};
    const movieSessionMap = movieSessions.sort((a, b) => a.startTime < b.startTime ? -1 : 1).reduce((map, item) => {
        const startTime = moment(item.startTime);
        
        const startTimeMap = startTime.toObject();
    
        if (map[item.movie.id] === undefined) {
            map[item.movie.id] = {};
            if(movieMap[item.movie.id] === undefined){
                movieMap[item.movie.id] = item.movie;
            }
        }
        if(map[item.movie.id][startTimeMap.year] === undefined){
            map[item.movie.id][startTimeMap.year] = {};
        }
        if(map[item.movie.id][startTimeMap.year][startTimeMap.month] === undefined){
            map[item.movie.id][startTimeMap.year][startTimeMap.month] = {};
        }
        if(map[item.movie.id][startTimeMap.year][startTimeMap.month][startTimeMap.date]=== undefined){
            map[item.movie.id][startTimeMap.year][startTimeMap.month][startTimeMap.date] = [];
        }
        item.startTimeInMoment = startTime;
        map[item.movie.id][startTimeMap.year][startTimeMap.month][startTimeMap.date].push(item);
        
        return map;
    }, {});
    /*
        movieSessionMap : {
            $movieId : {
                $year : {
                    $month : {
                        $date : [$sessions, ]
                    }, ...
                },...
            },...
        }
    */

    const onClickMovieSession = (movieSession) => {
        newBookingSession(movieSession);
        history.push('/booking');
    }

    const renderMovieSession = (movieSessions) => {
        return <div>
            <Grid container item xs={12}>
                {movieSessions[0].startTimeInMoment.format('YYYY-MM-DD')}
            </Grid>
            {movieSessions.map(session => {
                return <div onClick={() => onClickMovieSession(session)}>{session.startTimeInMoment.format('HH:MM')}</div>
            })}
        </div>

    }

    const renderMovieSessions = (
        <div>
        { Object.keys(movieMap).map((movieId) => {  
            return (
                <div>
                    <Grid container item xs={12}>
                        {movieMap[movieId].name} <div onClick={() => handleOpen(movieMap[movieId])}>More details</div>
                    </Grid>
                    <Divider/>
                    {
                        Object.keys(movieSessionMap[movieId]).map((movieSessionByYear) => {
                            return Object.keys(movieSessionMap[movieId][movieSessionByYear]).map((movieSessionByMonth) => {
                                return Object.keys(movieSessionMap[movieId][movieSessionByYear][movieSessionByMonth]).map((movieSessionByDay) => {
                                    return renderMovieSession(movieSessionMap[movieId][movieSessionByYear][movieSessionByMonth][movieSessionByDay])
                                })  
                            }) 
                        }) 
                    }
                    <Divider/>
                </div>
                
                )
        })}

        <Modal open={open} onClose={handleClose}>
            <div>
              <MovieInfoModal movie={movieInfoInModal}/>
            </div>
          </Modal>
        </div>
    );
    return <>{renderMovieSessions}</>;
}

export default MovieSessionList;
