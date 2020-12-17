import React from 'react';
import { Grid, Divider, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import { useLocation, useHistory } from 'react-router-dom';
import '../Style/commonStyle.css';
import './MovieSessionPickerPage.css';

function MovieSessionList({ movieSessions, newBookingSession }) {
  let history = useHistory();
  let { pathname } = useLocation();
  const [keyword, setKeyword] = React.useState('');


  const cinemaMap = {};
  const movieSessionMap = movieSessions
    .sort((a, b) => (a.startTime < b.startTime ? -1 : 1))
    .reduce((map, item) => {
      const startTime = moment(item.startTime);

      const startTimeMap = startTime.toObject();

      const cinemaId = item.house.cinema.id;

      if (map[cinemaId] === undefined) {
        map[cinemaId] = {};
        if (cinemaMap[cinemaId] === undefined) {
          cinemaMap[cinemaId] = item.house.cinema;
        }
      }
      if (map[cinemaId][startTimeMap.year] === undefined) {
        map[cinemaId][startTimeMap.year] = {};
      }
      if (
        map[cinemaId][startTimeMap.year][startTimeMap.month] === undefined
      ) {
        map[cinemaId][startTimeMap.year][startTimeMap.month] = {};
      }
      if (
        map[cinemaId][startTimeMap.year][startTimeMap.month][
          startTimeMap.date
        ] === undefined
      ) {
        map[cinemaId][startTimeMap.year][startTimeMap.month][
          startTimeMap.date
        ] = [];
      }
      item.startTimeInMoment = startTime;
      map[cinemaId][startTimeMap.year][startTimeMap.month][
        startTimeMap.date
      ].push(item);

      return map;
    }, {});
  /*
        movieSessionMap : {
            $cinemaId : {
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
  };

  const renderMovieSession = (movieSessions) => {
    return (
      <Accordion key={movieSessions[0].startTimeInMoment.format('YYYY/MM/DD')} className={'session-picker-sessions-dropdown'}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} className={'dropdown-header'}>
          {movieSessions[0].startTimeInMoment.format('YYYY/MM/DD')}
        </AccordionSummary>
        <AccordionDetails>
        {movieSessions.map((session) => {
          return (
            <div className={'session-card'} key={session.id} onClick={() => onClickMovieSession(session)}>
              {session.startTimeInMoment.format('HH:mm')}
            </div>
          );
        })}
        </AccordionDetails>
      </Accordion>
    );
  };

  const renderMovieSessions = (
    <div>
      <input
        type='text'
        className={'search-box'}
        placeholder='Search by name'
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
      />
      {Object.keys(cinemaMap)
        .filter(function (movieId) {
          return keyword === ''
            ? true
            : cinemaMap[movieId].name
                .toLowerCase()
                .indexOf(keyword.toLowerCase()) >= 0; //force toLowerCase to ignore case
        })
        .map((movieId) => {
          return (
            <Grid container item xs={12} key={movieId}>
                <Grid container item xs={8} className={'session-picker-movie-name'} alignItems='center'>
                  {cinemaMap[movieId].name}
                </Grid>              
                <Grid container item xs={12}>
                  {Object.keys(movieSessionMap[movieId]).map(
                    (movieSessionByYear) => {
                      return Object.keys( movieSessionMap[movieId][movieSessionByYear]).map((movieSessionByMonth) => {
                        return Object.keys(movieSessionMap[movieId][movieSessionByYear][movieSessionByMonth]).map((movieSessionByDay) => {
                          return renderMovieSession(movieSessionMap[movieId][movieSessionByYear][movieSessionByMonth][movieSessionByDay]);
                        });
                      });
                    }
                  )}
                </Grid>
              <Divider />
            </Grid>
          );
        })}
    </div>
  );
  return <>{renderMovieSessions}</>;
}

export default MovieSessionList;
