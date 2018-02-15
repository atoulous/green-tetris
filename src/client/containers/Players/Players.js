import React from 'react';
import { connect } from 'react-redux';

import Player from '../../components/Player/Player';
import './Players.scss';


const Players = ({ players }) => (
  <div className="players">
    <div className="players-title">PLAYERS</div>
    {players.map(player => <Player key={player.id} player={player} />)}
  </div>
);

const mapStateToProps = state => ({
  players: state.players,
});

export default connect(mapStateToProps)(Players);
