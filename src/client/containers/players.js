import React from 'react';
import { connect } from 'react-redux';
import Player from '../components/player';

const Players = ({ players }) => {
    return (
        <div className='players'>
            {players.map(player => {
                return <Player key={player.id} player={player} />
            })}
        </div>
    );
}

const mapStateToProps = state => ({
    players: state.players,
});

export default connect(mapStateToProps)(Players);