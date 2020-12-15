import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Divider, Grid } from '@material-ui/core';

import { getCinema } from '../../apis/cinema';

import MovieSessionListContainer from '../../Container/CinemaSessionPickerPageContainer/MovieSessionListContainer'

function CineamSessionPicker() {
    const cinemaId = useParams().id;
    const [cinema, setCinema] = useState(
        useSelector((state) => state.cinemas[cinemaId])
    );
    
    let history = useHistory();
    useEffect(() => {
        if (cinema === undefined) {
            console.log(
                'Cinema' + cinemaId + ' not in redux, fetch from server'
            );
            getCinema(cinemaId).then((response) => {
                //Todo: Enhancement update fetched movie to redux
                setCinema(response.data);
            });
        }
    });

    
    const [movieSessions, setMovieSession] = useState([
        {
            id: '5fd760d56500c940f174f4b0',
            movie: {
                id: '5fd760d56500c940f174f4a0',
                name: 'Beyond the dream',
                duration: 100,
                genres: [
                    {
                        id: '5fd760d56500c940f174f4a0',
                        name: 'Romance',
                    },
                ],
                director: 'Kiwi Chow',
                description: 'I go to school by bus',
                imageUrl:
                    'https://wmoov.com/assets/movie/photo/201912/FB_IMG_1576452551183_1576574597.jpg',
                rating: 'IIA',
                cast: ['ME', 'Them'],
                language: 'Cantonese',
            },
            house: {
                id: '5fd760d56500c940f174f4a01',
                cinemaId: '5fd760d56500c940f174f4a2',
                name: 'House 1',
                capacity: 100,
            },
            startTime: 1608018165676,
            prices: {
                Adult: 100,
                Student: 60,
            },
            occupied: {},
            occupancyCount: 1,
        },
        {
            id: '5fd760d56500c940f174f4b0',
            movie: {
                id: '5fd760d56500c940f174f4a0',
                name: 'Beyond the dream',
                duration: 100,
                genres: [
                    {
                        id: '5fd760d56500c940f174f4a0',
                        name: 'Romance',
                    },
                ],
                director: 'Kiwi Chow',
                description: 'I go to school by bus',
                imageUrl:
                    'https://wmoov.com/assets/movie/photo/201912/FB_IMG_1576452551183_1576574597.jpg',
                rating: 'IIA',
                cast: ['ME', 'Them'],
                language: 'Cantonese',
            },
            house: {
                id: '5fd760d56500c940f174f4a01',
                cinemaId: '5fd760d56500c940f174f4a2',
                name: 'House 1',
                capacity: 100,
            },
            startTime: 1608019165676,
            prices: {
                Adult: 100,
                Student: 60,
            },
            occupied: {},
            occupancyCount: 1,
        },,
        {
            id: '5fd760d56500c940f174f4b0',
            movie: {
                id: '5fd760d56500c940f174f4a3',
                name: 'Helloworld',
                duration: 100,
                genres: [
                    {
                        id: '5fd760d56500c940f174f4a0',
                        name: 'Romance',
                    },
                ],
                director: 'Kiwi Chow',
                description: 'I go to school by bus',
                imageUrl:
                    'https://wmoov.com/assets/movie/photo/201912/FB_IMG_1576452551183_1576574597.jpg',
                rating: 'IIA',
                cast: ['ME', 'Them'],
                language: 'Cantonese',
            },
            house: {
                id: '5fd760d56500c940f174f4a01',
                cinemaId: '5fd760d56500c940f174f4a2',
                name: 'House 1',
                capacity: 100,
            },
            startTime: 1608019165676,
            prices: {
                Adult: 100,
                Student: 60,
            },
            occupied: {},
            occupancyCount: 1,
        },
    ]);
    return (
        <Grid container justify='center' alignItems='center'>
            <Grid container item xs={10} className={'paper-content'}>
                <Grid container item xs={12} onClick={() => history.push('/cinemas')}>
                    <div>Back To Cinemas</div>
                </Grid>
                <Grid container item xs={12}>
                    <div className={'section-title'}>Movies on Show</div>
                </Grid>
                {cinema === undefined ? (
                    <Grid container item xs={12}>
                        Disconnected from server
                    </Grid>
                ) : (
                    <div>
                    
                        <div>
                            <Grid container item xs={12}>
                                <div className={'sub-section-title'}>{cinema.name}</div>
                            </Grid>
                        </div>
                        <Divider/>
                        <MovieSessionListContainer movieSessions= {movieSessions}/>
                    </div>
                )}
            </Grid>
        </Grid>
    );
}

export default CineamSessionPicker;
