import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TetrisPlayer from '../../components/TetrisPlayer/TetrisPlayer';
import './TetrisPlayersList.scss';


const TetrisPlayersList = ({ game: { players }, playerId }) => (
  <div className="tetris-players-list">
    <div className="tetris-players-list-title">PLAYERS</div>
    {players.map(player => <TetrisPlayer key={player.webRTCId} player={player} selfId={playerId} />)}
  </div>
);

TetrisPlayersList.propTypes = {
  game: PropTypes.object,
  playerId: PropTypes.number,
};

TetrisPlayersList.defaultProps = {
  game: null,
  playerId: null,
};

export default TetrisPlayersList;
