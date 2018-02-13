import React from 'react';
import Tetris from './tetris';
import Players from './players';

const TetrisView = () => {
    return (
        <div className='tetris-view'>
            <Tetris />
            <Players />
        </div>
    );
}

export default TetrisView;