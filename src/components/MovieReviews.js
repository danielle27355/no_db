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
                        <h2>My Reviews</h2>
                        <p>{this.props.myReview}</p>
                        <textarea className='textbox-for-review' placeholder='write your review here'></textarea>
                    </div>
                </div>
            </div>
        )
    }
    

}

export default MovieReviews;