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
            <div>
                <p>display review</p>
                <textarea placeholder='write your review here'></textarea>
            </div>
        )
    }
    

}

export default MovieReviews;