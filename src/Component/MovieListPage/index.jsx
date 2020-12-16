import React, { useState, useEffect } from 'react';
import MovieCard from '../MovieCard';
import { getAllMovies } from '../../apis/movie';
import './MovieListPage.css';
import '../Style/commonStyle.css'
import { Grid, Modal } from '@material-ui/core';


import MovieInfoModal from '../MovieInfoModal';

function MovieListPage(props) {
    const [open, setOpen] = React.useState(false);
    const [movieInfoInModal, setMovieInfoInModal] = React.useState({});
    const [keyword, setKeyword] = useState("");

    const handleOpen = (movieInfoInModal) => {
        setOpen(true);
        setMovieInfoInModal(movieInfoInModal);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getAllMovies().then((response) => {
            props.initMovieList(response.data);
          });
      });

    const changeKeyWord = (event) => {
        setKeyword(event.target.value);
      }

    var filteredMovieList = props.movieList;
    if (keyword !== "") {
    filteredMovieList = filteredMovieList.filter(movie => 
        movie.name.toLowerCase().includes(keyword.toLowerCase())
    )
    }

    const movies =
    filteredMovieList.length > 0 ? (
        filteredMovieList.map((movie) => {
        return <MovieCard key={movie.id} movie={movie} onClickMoreDetails={handleOpen}/>
        })
    ) : (
        <p className={'indicator-text'}>No available movie</p>
        );

    const renderMovieList = (
        <div>
            <Grid container justify='center' alignItems='center'>
                <Grid container item xs={10} className={'main-content'}>
                <Grid container item xs={12} >
                    <div className={'section-header'}>Movies</div>
                </Grid>
                <Grid container item xs={12} >
                    <input type='text' className={'search-box'} placeholder='Search' onChange={changeKeyWord} />
                    {movies}
                </Grid>
                </Grid>
            </Grid>

            <Modal open={open} onClose={handleClose}>
                <div>
                <MovieInfoModal movie={movieInfoInModal}/>
                </div>
            </Modal>
        </div>
    );
    return <>{renderMovieList}</>;
}

export default MovieListPage;