import React, { Component } from 'react';
import animated from './animated.gif'

class SelectedMovie extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        var pick = this.props.myPoster ? 'https://image.tmdb.org/t/p/w300' + this.props.myPoster : animated;
        return(
            <ul className="movie-displayer borderhover">
                <li className='movieTitle'><h2>{this.props.myMovie}</h2></li>
                <img className='poster selectedPoster' src={pick} alt={animated}/>
                <button className='getReviewButton input-periphs' onClick={() => this.props.addMovie(this.props.myMovie)}>Add to Watchlist</button>  
            </ul>
        )
    }
}

export default SelectedMovie;