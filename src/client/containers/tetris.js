import React from 'react';
import Score from './score';
import Game from './game';

const Tetris = () => {
    return (
        <div className='tetris'>
            <Score/>
            <Game />
        </div>
    );
}

export default Tetris;