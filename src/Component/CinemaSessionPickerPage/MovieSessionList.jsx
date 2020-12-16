import React from 'react';
import { Grid, Divider, Modal, Input } from '@material-ui/core';
import moment from 'moment';
import { useLocation, useHistory } from 'react-router-dom';


import MovieInfoModal from '../MovieInfoModal';

function MovieSessionList({ movieSessions, newBookingSession }) {
    let history = useHistory();
    let {pathname} = useLocation();
    const [open, setOpen] = React.useState(false);
    const [movieInfoInModal, setMovieInfoInModal] = React.useState({});
    const [keyword, setKeyword] = React.useState("");

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
        newBookingSession(movieSession, pathname);
        history.push('/booking');
    }

    const renderMovieSession = (movieSessions) => {
        return <div key={movieSessions[0].startTimeInMoment.format('YYYY-MM-DD')}>
            <Grid container item xs={12}>
                {movieSessions[0].startTimeInMoment.format('YYYY-MM-DD')}
            </Grid>
            {movieSessions.map(session => {
                return <div key={session.id} onClick={() => onClickMovieSession(session)}>{session.startTimeInMoment.format('HH:mm')}</div>
            })}
        </div>

    }

    const renderMovieSessions = (
        <div>
            <Input
                //addonBefore="Search"
                placeholder="Search by name"
                //allowClear
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
          />
        { Object.keys(movieMap).filter(function (movieId) {
            return keyword === ""
              ? true
              : movieMap[movieId].name.toLowerCase().indexOf(keyword.toLowerCase()) >= 0; //force toLowerCase to ignore case
          }).map((movieId) => {  
            return (
                <div key={movieId}>
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
