import React, { Component } from 'react';
import axios from 'axios';

class GenreFilter extends Component {
    constructor(props){
        super(props);
        this.state = {
            genreId: '',
            greaterThan: '1900',
            lessThan: '2018'
        }
    }
    componentDidMount(){
        axios.get('http://localhost:4000/api/moviesGenre').then(response => {
            console.log(response.data)
            this.setState({
                genreId: response.data,
                
            })
            
            }  
        )
    }

    render(){
        var selectGenre = this.state.genreId ? this.state.genreId.map((genre, i) => {
            return (
                <option key={i} value={genre['id']}>{genre['name']}</option>
            )
        }) : 'loading'


        return(
            <div className='filter-styles'>
                <select className='input-periphs' onChange={(e) => this.props.gettingGenre(e.target.value)}>
                    {selectGenre}
                </select>
                <p>Years greater than: {this.state.greaterThan}</p>
                <input className='slider' onChange={(e) => {
                    this.setState({greaterThan: e.target.value}); 
                    this.props.startYear(this.state.greaterThan);
                    }} type="range" min="1900" max="2018" step="1" value={this.state.greaterThan}/>
                <p>Years less than: {this.state.lessThan}</p>
                <input className='slider' onChange={(e) => {
                    this.setState({lessThan: e.target.value});
                    this.props.endYear(this.state.lessThan);
                    }} type="range" min="1900" max="2018" step="1" value={this.state.lessThan}/>
            </div>
        )
    }
}
export default GenreFilter;