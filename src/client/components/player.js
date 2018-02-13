import React from 'react';
import Spectrum from './spectrum';
import Label  from './label';

const Player = (props) => {

    const { player } = props;

    return (<div className='player-box'>
                <div className='player-header'>
                    <Label additionalClasses={['player', 'left']}>{player.name}</Label>
                    <Label additionalClasses={['player', 'right']}>{player.score}</Label>
                </div>
                <div className='player-content'>
                    <Spectrum spectrum={player.spectrum}/>
                </div>
            </div>)
}

export default Player;