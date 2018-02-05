import React, { Component } from 'react';
import axios from 'axios';
import loader from './loader.png'
import MovieReviews from './MovieReviews';

class MovieDisplay extends Component {
    constructor(props){
        super(props)
        this.state = {
            movieData: '',
            id: '',
            page: 1,
            mySelectedMovie: '',
            myPosterPath: '',
            myMovieOverView: '',
            review: ''
        }
        
    } 

    render(){

        var movie_titles = this.props.movieInfo ? this.props.movieInfo.map(movie => {
            
            return(
                <ul onClick={() => this.props.movieSelector(movie.title, movie.poster_path, movie.overview)} className="movie-displayer cursor">
                    <li className='movieTitle'><h2>{movie.title}</h2></li>
                    <img className='poster' src={'https://image.tmdb.org/t/p/w300' + movie.poster_path} alt="none"/>
                    <li className='movieSummary'>{movie.overview}</li>
                </ul>

            )
        }): 'loading'
        var pick = this.props.moviePoster ? 'https://image.tmdb.org/t/p/w300' + this.props.moviePoster : loader;
        return (
            <div>
                <div className='movie-display'>
                    {movie_titles}
                </div>
            </div>
        )
    }
}

export default MovieDisplay;