import React, { Component } from 'react';
import MovieDisplay from './components/MovieDisplay';
import Header from './components/Header'
import './reset.css';
import './App.css';
import MovieReviews from './components/MovieReviews';

class App extends Component {
  render() {
    return (
      <div className='app-container'>
          <Header />
          <MovieDisplay />
        </div>
    );
  }
}

export default App;
