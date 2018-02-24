import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TetrisPlayer from '../../components/TetrisPlayer/TetrisPlayer';
import './TetrisPlayersList.scss';


const TetrisPlayersList = ({ players }) => (
  <div className="tetris-players-list">
    <div className="tetris-players-list-title">PLAYERS</div>
    {players.map(player => <TetrisPlayer key={player.webRTCId} player={player} />)}
  </div>
);

const mapStateToProps = state => ({
  players: state.game.players
});

TetrisPlayersList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.number,
    spectrum: PropTypes.array,
  })).isRequired,
};

export default connect(mapStateToProps)(TetrisPlayersList);
