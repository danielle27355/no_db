import React, { Component } from 'react';


class ReviewAndUpdate extends Component {
    constructor(props){
        super(props)
        this.state = {
            newReview: ''

        }
    }

    render(){
        return(
            <div className='movie-displayer'>
            <h2>Write Review</h2>
            <textarea className='textbox-for-review' onChange={(e) => this.setState({newReview: e.target.value})} value={this.state.newReview} placeholder='Write or update your reviews'></textarea>
            <button className='btn input-periphs' onClick={() => {
                this.props.addAndUpdate(this.state.newReview)
                
                    this.setState({newReview: ''})
                
                }}>Post</button>
            </div>
        )
    }
}

export default ReviewAndUpdate
