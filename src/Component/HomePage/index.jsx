import React, { Component } from 'react';
import { getAllMovies } from './../../apis/movie';

export default class HomePage extends Component {
    componentDidMount() {
        getAllMovies().then((response) => {
            this.props.initMovieList(response.data);
        });
    }

    render() {
        return (
            <h1>Hello</h1>
        )
    }
}