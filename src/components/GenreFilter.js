import React, { Component } from 'react';
import axios from 'axios';

class GenreFilter extends Component {
    constructor(props){
        super(props);
        this.state = {
            genreId: ''
        }
    }
    componentDidMount(){
        axios.get('http://localhost:4000/api/moviesGenre').then(response => {
            console.log(response.data)
            this.setState({
                genreId: response.data
            })
            
            }  
        )
    }

    render(){
        var selectGenre = this.state.genreId ? this.state.genreId.map(genre => {
            return (
                <option value={genre['id']}>{genre['name']}</option>
            )
        }) : 'loading'

        return(
            <div className='filter-styles'>
                <select className='input-periphs' onChange={(e) => this.props.gettingGenre(e.target.value)}>
                    {selectGenre}
                </select>
            </div>
        )
    }
}
export default GenreFilter;