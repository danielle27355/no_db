import React, { Component } from 'react';
import axios from 'axios';

class MovieReviews extends Component {
    constructor(props){
        super(props)
        this.state = {
            review: '',
            
        }
    }

    

    render(){
        return(
            <div className="movie-displayer">
                <div className='reviewBox'>
                    <div>
                        <h2>My Reviews:</h2>
                        <h3 className='reviewed'>{this.props.myMovie}</h3>
                        <p>{this.props.myReview}</p>
                        
                    </div>
                </div>
            </div>
        )
    }
    

}

export default MovieReviews;