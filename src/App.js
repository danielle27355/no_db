import React, { Component } from 'react';
import MovieDisplay from './components/MovieDisplay';
import Header from './components/Header'
import axios from 'axios';
import './reset.css';
import './App.css';
import MovieReviews from './components/MovieReviews';
import SelectedMovie from './components/SelectedMovie';
import GenreFilter from './components/GenreFilter';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
        movieData: '',
        id: '',
        page: 1,
        mySelectedMovie: '',
        myPosterPath: '',
        myMovieOverView: '',
        review: '',
        watchList: '',
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.getReview = this.getReview.bind(this);
    this.getMovieByGenre = this.getMovieByGenre.bind(this)
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.addToWatchList = this.addToWatchList.bind(this);
    this.removeItem = this.removeItem.bind(this);
} 
  componentDidMount(){
    var num = this.state.page;
    var initalDisplayURL = `https://api.themoviedb.org/3/discover/movie?api_key=2cb1a152db8ebb725faecd0edc957f33&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${num}`;
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=2cb1a152db8ebb725faecd0edc957f33&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${num}`).then(response => {  
    this.setState({
            movieData: response.data.results,
            page: this.state.page + 1
        })
    })
    axios.get('http://localhost:4000/api/watchList').then(response => {
            this.setState({
              watchList: response.data
            })
        })
  }
    changeHandler(selected, poster, overview){
        this.setState({
          mySelectedMovie: selected,
          myPosterPath: poster,
          myMovieOverView: overview,
          review: ''
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
       console.log(this.state.page)
       var num = this.state.page;
       axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=2cb1a152db8ebb725faecd0edc957f33&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${num}&with_genres=${this.state.id}`).then(response => {
           this.setState({
               movieData: response.data.results,
           })
       
       })   
   }

   prevPage(){
    if(this.state.page > 0){this.setState({
        page: this.state.page - 1
    })
    console.log(this.state.page)
    var num = this.state.page;
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=2cb1a152db8ebb725faecd0edc957f33&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${num}&with_genres=${this.state.id}`).then(response => {
        
        this.setState({
            movieData: response.data.results,
        })
    
    })}   
  } 
    addToWatchList(movie){
      axios.post(`http://localhost:4000/api/watchList`, { title: movie}).then(response => {
            
            this.setState({
              watchList: response.data
            })
        
      })
      
        
    }

    removeItem(movie){
      axios.delete(`http://localhost:4000/api/watchList?name=${movie}`).then(response => {
          this.setState({
              watchList: response.data
          })
          
      })

    }

    getReview(selectedMovie){
      var reviewURL = `http://localhost:4000/api/moviesReview?name=${selectedMovie}`;
        
      axios.get(reviewURL).then(response => {  
          if(response.data.review){    
          this.setState({
                  review: response.data.review
              
          }) 
          } else {
              this.setState({ 
                  review: "You haven't reviewed this movie, you should write a review!"
              })
          }
      })
    }
    
  
  render() {

    var watchList = this.state.watchList ? this.state.watchList.map(movie => {
      
      return (
          <ul>
              <li>{movie.title}</li>
              <button onClick={() => this.getReview(movie.title)}>Show Review</button>
              <button onClick={() => this.getReview(movie.title)}>Update</button>
              <button onClick={() => this.removeItem(movie.title)}>Delete</button>
              
          </ul>
      )

  }): 'watch list empty'

    return (
      <div className='app-container'>
        <div>
            <Header />
            <MovieDisplay movieInfo={this.state.movieData} movieSelector={this.changeHandler}/>
            <div className='right-sidebar'>
              <MovieReviews myReview={this.state.review} />
              <div className='watchList movie-displayer'>
                    <h2>My Watch List:</h2>
                    {watchList}
                </div>
            </div>
            <div className='left-sidebar'>
              <SelectedMovie myMovie={this.state.mySelectedMovie} myPoster={this.state.myPosterPath} addMovie={this.addToWatchList}/>
              <div className='filter-menu movie-displayer'>
                  <GenreFilter gettingGenre={this.getMovieByGenre}/>
                  <button className='btn go input-periphs' onClick={() => this.goButton()}>Go</button>
                  <button className='btn next input-periphs' onClick={() => this.nextPage()}>Next Page</button>
                  <button className='btn next input-periphs' onClick={() => this.prevPage()}>Previouse Page</button>
              </div>
            </div>
          </div> 
      </div>
    );
  }
}

export default App;
