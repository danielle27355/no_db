import React, { Component } from 'react';
import axios from 'axios';

class ShouldIWatch extends Component {
    constructor(props){
        super(props)
        this.state = {
            temperature: null,
            weather:'',
            icon:'',
            zipCode: '85213',
            cityName: 'Mesa',

        }
    }
    componentDidMount(){
        function kelvToFaren(kelv){
            return Math.floor((kelv * (9/5)- 459.67));
        }
        axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${this.state.zipCode},us&APPID=d9243089f2556c263804dbef4d445f23`).then(response => {
            var tempKelvin = response.data.main.temp;
            var weather = response.data.weather[0].description;
            var icon = response.data.weather[0].icon;
            var cityname = response.data.name
            console.log(response.data)
            this.setState({
                temperature: kelvToFaren(tempKelvin),
                weather: weather,
                icon: icon,
                cityName: cityname
            })   
        })
    }

    updateZip(zip){
        function kelvToFaren(kelv){
            return Math.floor((kelv * (9/5)- 459.67));
        }
        axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&APPID=d9243089f2556c263804dbef4d445f23`).then(response => {
            var tempKelvin = response.data.main.temp;
            var weather = response.data.weather[0].description;
            var icon = response.data.weather[0].icon;
            var cityname = response.data.name;
            console.log(response.data.name)
            this.setState({
                temperature: kelvToFaren(tempKelvin),
                weather: weather,
                icon: icon,
                cityName: cityname
            })     
        })
    }

    render(){
        return(
            <div className='movie-displayer weatherTile'>
                <h2 className='weather-h2'>Weather:</h2>
                <p> the temperature in {this.state.cityName}:</p>
                <p className='temp'>{this.state.temperature}&#8457;</p>
                <img src={`http://openweathermap.org/img/w/${this.state.icon}.png`}/>
                <p className='weatherDescription'>{`Hmmm... ${this.state.weather} outside, you should propbably just stay in and watch a movie`}</p>
                <input className='input-periphs' onChange={(e) => this.setState({zipCode: e.target.value})}/>
                <button onClick={() => this.updateZip(this.state.zipCode)} className='btn input-periphs'>Submit</button>
            </div>
        )
    }
}

export default ShouldIWatch;