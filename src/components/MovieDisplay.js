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
    // componentDidMount(){
    //     var num = this.state.page;
    //     var initalDisplayURL = `https://api.themoviedb.org/3/discover/movie?api_key=2cb1a152db8ebb725faecd0edc957f33&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${num}`;
    //     var reviewURL = `http://localhost:4000/api/moviesReview?name=${this.state.mySelectedMovie}`;
    //     function displayMovies(){
    //         return axios.get(initalDisplayURL);
    //     }
    //     function displayReviews(){
    //         return axios.get(reviewURL);
    //     }
    //     axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=2cb1a152db8ebb725faecd0edc957f33&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${num}`).then(response => {  
    //     this.setState({
    //             movieData: response.data.results,
    //             page: this.state.page + 1
    //         })
    //     })
        
    // }

    // displayReview(){

    //     var reviewURL = `http://localhost:4000/api/moviesReview?name=${this.state.mySelectedMovie}`;
        
    //         axios.get(reviewURL).then(response => {  
    //             if(response.data.review){    
    //             this.setState({
    //                     review: response.data.review
                    
    //             }) 
    //             } else {
    //                 this.setState({ 
    //                     review: "You haven't reviewd this movie, you should write a review!"
    //                 })
    //             }
    //         })
        
    // }

    
    getMovieByGenre(genre){
        this.setState({
            id: genre,
            page: 1
        })
    }

    // goButton(){
    //    this.setState({
    //        page:1
    //    })
    //     var num = this.state.page;
    //     axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=2cb1a152db8ebb725faecd0edc957f33&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${num}&with_genres=${this.state.id}`).then(response => {
    //     this.setState({
    //             movieData: response.data.results
    //         })
    //     })
    // }

    // nextPage(){
    //     this.setState({
    //         page: this.state.page + 1
    //     })
    //     var num = this.state.page;
    //     axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=2cb1a152db8ebb725faecd0edc957f33&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${num}&with_genres=${this.state.id}`).then(response => {
    //         console.log(response.data.results)
    //         this.setState({
    //             movieData: response.data.results,
    //             page: this.state.page + 1
    //         })
        
    //     })   
    // }


    render(){

        var movie_titles = this.props.movieInfo ? this.props.movieInfo.map(movie => {
            
            return(
                <ul onClick={() => this.props.movieSelector(movie.title, movie.poster_path, movie.overview)} className="movie-displayer">
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