import React from 'react';
import { Grid, Divider, Modal, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import { useLocation, useHistory } from 'react-router-dom';
import '../Style/commonStyle.css';
import './CinemaSessionPickerPage.css';

import MovieInfoModal from '../MovieInfoModal';

function MovieSessionList({ movieSessions, newBookingSession }) {
  let history = useHistory();
  let { pathname } = useLocation();
  const [open, setOpen] = React.useState(false);
  const [movieInfoInModal, setMovieInfoInModal] = React.useState({});
  const [keyword, setKeyword] = React.useState('');

  const handleOpen = (movieInfoInModal) => {
    setOpen(true);
    setMovieInfoInModal(movieInfoInModal);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const movieMap = {};
  const movieSessionMap = movieSessions
    .sort((a, b) => (a.startTime < b.startTime ? -1 : 1))
    .reduce((map, item) => {
      const startTime = moment(item.startTime);

      const startTimeMap = startTime.toObject();

      if (map[item.movie.id] === undefined) {
        map[item.movie.id] = {};
        if (movieMap[item.movie.id] === undefined) {
          movieMap[item.movie.id] = item.movie;
        }
      }
      if (map[item.movie.id][startTimeMap.year] === undefined) {
        map[item.movie.id][startTimeMap.year] = {};
      }
      if (
        map[item.movie.id][startTimeMap.year][startTimeMap.month] === undefined
      ) {
        map[item.movie.id][startTimeMap.year][startTimeMap.month] = {};
      }
      if (
        map[item.movie.id][startTimeMap.year][startTimeMap.month][
          startTimeMap.date
        ] === undefined
      ) {
        map[item.movie.id][startTimeMap.year][startTimeMap.month][
          startTimeMap.date
        ] = [];
      }
      item.startTimeInMoment = startTime;
      map[item.movie.id][startTimeMap.year][startTimeMap.month][
        startTimeMap.date
      ].push(item);

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
      {Object.keys(movieMap)
        .filter(function (movieId) {
          return keyword === ''
            ? true
            : movieMap[movieId].name
                .toLowerCase()
                .indexOf(keyword.toLowerCase()) >= 0; //force toLowerCase to ignore case
        })
        .map((movieId) => {
          return (
            <Grid container item xs={12} key={movieId}>
                <Grid container item xs={8} className={'session-picker-movie-name'} alignItems='center'>
                  {movieMap[movieId].name}
                </Grid>
                <Grid container item xs={4} onClick={() => handleOpen(movieMap[movieId])} className={'link-style-button'} justify='flex-end' alignItems='center'>
                    More details
                </Grid>

              <Grid container item xs={12} className={'session-picker-sessions-dropdown-list'}>
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

      <Modal open={open} onClose={handleClose}>
        <div>
          <MovieInfoModal movie={movieInfoInModal} />
        </div>
      </Modal>
    </div>
  );
  return <>{renderMovieSessions}</>;
}

export default MovieSessionList;