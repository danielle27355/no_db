import React from 'react';
import giphy from './giphy.gif'

const Header = () => {

    return(
    <div>
        <img className='coolGif' src={giphy} alt={giphy}/>
        <div className='pageTitle'>
            <div className='banner'>
                <h1 >Show Me Dem Movies!</h1>
            </div>
            <div className='banner'>
                <h1 >Show Me Dem Movies!</h1>
            </div>
            <div className='banner'>
                <h1 >Show Me Dem Movies!</h1>
            </div>
        </div>
    </div>
        )
}

export default Header