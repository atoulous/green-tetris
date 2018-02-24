import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import { socketUpdateGame } from '../../actions/socket';

const GameEnd = ({ isMaster, hasWon, resetGame, gameId, dispatch }) => {

  const restartGame = () => {
    dispatch(socketUpdateGame(gameId, {
      hasStarted: false,
    }));
  };

  return (
    <div>
      {hasWon ? 'bravo t es un champion ! ' : 'tes mauvais jack'}
      {isMaster && <RaisedButton label="PLAY AGAIN" onClick={restartGame} />}
    </div>
  );
};

export default connect()(GameEnd);
