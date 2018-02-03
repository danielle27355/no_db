import React, { Component } from 'react';
import axios from 'axios';
import GenreFilter from './GenreFilter';
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
        this.getMovieByGenre = this.getMovieByGenre.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.displayReview = this.displayReview.bind(this);
    } 
    componentDidMount(){
        var num = this.state.page;
        var initalDisplayURL = `https://api.themoviedb.org/3/discover/movie?api_key=2cb1a152db8ebb725faecd0edc957f33&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${num}`;
        var reviewURL = `http://localhost:4000/api/moviesReview?name=${this.state.mySelectedMovie}`;
        function displayMovies(){
            return axios.get(initalDisplayURL);
        }
        function displayReviews(){
            return axios.get(reviewURL);
        }

        // axios.all([displayMovies(), displayReviews()]).then(axios.spread((initDisplay, reviews)=>{
        //     console.log(reviews.data.review)
        //     this.setState({
            
        //         movieData: initDisplay.data.results,
        //         page: this.state.page + 1,
        //         review: reviews.data.review

        //     })
        // }))
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=2cb1a152db8ebb725faecd0edc957f33&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${num}`).then(response => {  
        this.setState({
                movieData: response.data.results,
                page: this.state.page + 1
            })
        })
        
    }

    displayReview(){

        var reviewURL = `http://localhost:4000/api/moviesReview?name=${this.state.mySelectedMovie}`;
        
            axios.get(reviewURL).then(response => {  
                if(response.data.review){    
                this.setState({
                        review: response.data.review
                    
                }) 
                } else {
                    this.setState({ 
                        review: "You haven't reviewd this movie, you should write a review!"
                    })
                }
            })
        
    }
    getMovieByGenre(genre){
        this.setState({
            id: genre,
            page: 1
        })
    }

    goButton(){
       this.setState({
           page:1
       })
        var num = this.state.page;
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=2cb1a152db8ebb725faecd0edc957f33&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${num}&with_genres=${this.state.id}`).then(response => {
        this.setState({
                movieData: response.data.results
            })
        })
    }

    nextPage(){
        this.setState({
            page: this.state.page + 1
        })
        var num = this.state.page;
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=2cb1a152db8ebb725faecd0edc957f33&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${num}&with_genres=${this.state.id}`).then(response => {
            console.log(response.data.results)
            this.setState({
                movieData: response.data.results,
                page: this.state.page + 1
            })
        
        })   
    }


    render(){

        var movie_titles = this.state.movieData ? this.state.movieData.map(movie => {
            
            return(
                <ul onClick={() => {
                    
                    this.setState({
                    mySelectedMovie: movie.title,
                    myPosterPath: movie.poster_path,
                    myMovieOverView: movie.overview,
                    review: ''
                
                })
                
                }} className="movie-displayer">
                    <li className='movieTitle'><h2>{movie.title}</h2></li>
                    <img className='poster' src={'https://image.tmdb.org/t/p/w300' + movie.poster_path} alt="none"/>
                    <li className='movieSummary'>{movie.overview}</li>
                </ul>

            )
        }): 'loading'
        var pick = this.state.myPosterPath ? 'https://image.tmdb.org/t/p/w300' + this.state.myPosterPath : loader;
        return (
            <div>
                <div className='movie-display'>
                    {movie_titles}
                    <ul className="movie-displayer left-sidebar">
                        <li className='movieTitle'><h2>{this.state.mySelectedMovie}</h2></li>
                        <img className='poster' src={pick} alt={loader}/>
                        <button onClick={() => this.displayReview()}>Show my review</button>  
                    </ul>
                    <div className="movie-displayer right-sidebar">
                        <p>{this.state.review}</p>
                        <MovieReviews />
                    </div>

                </div>
                <div className='filter-menu'>
                    <GenreFilter gettingGenre={this.getMovieByGenre}/>
                    <button className='btn go input-periphs' onClick={() => this.goButton()}>Go</button>
                    <button className='btn next input-periphs' onClick={() => this.nextPage()}>Next Page</button>
                    {console.log(this.state.mySelectedMovie)}
                </div>
            </div>
        )
    }
}

export default MovieDisplay;