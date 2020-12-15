import React from 'react';
import { Grid } from '@material-ui/core';
import moment from 'moment';

function MovieSessionList({ movieSessions }) {
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

    const renderMovieSession = (movieSessions) => {
        return <div>
            <Grid container item xs={12}>
                {movieSessions[0].startTimeInMoment.format('YYYY-MM-DD')}
            </Grid>
            {movieSessions.map(session => {
                return session.startTimeInMoment.format('HH:MM')
            })}
        </div>

    }

    const renderMovieSessions = (
        <div>
        { Object.keys(movieMap).map((movieId) => {  
            return (
                <div>
                    <Grid container item xs={12}>
                        {movieMap[movieId].name}
                    </Grid>
                    {
                        Object.keys(movieSessionMap[movieId]).map((movieSessionByYear) => {
                            return Object.keys(movieSessionMap[movieId][movieSessionByYear]).map((movieSessionByMonth) => {
                                return Object.keys(movieSessionMap[movieId][movieSessionByYear][movieSessionByMonth]).map((movieSessionByDay) => {
                                    return renderMovieSession(movieSessionMap[movieId][movieSessionByYear][movieSessionByMonth][movieSessionByDay])
                                })  
                            }) 
                        }) 
                    }
                </div>
                
                )
        })}
        </div>
    );
    return <>{renderMovieSessions}</>;
}

export default MovieSessionList;
