import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import store from '../../store/index';

import { socketRestartGame } from '../../actions/socket';

const EndGame = ({ isMaster, hasWon, gameId }) => {
  const restartGame = [
    <FlatButton
      label="RESTART GAME"
      onClick={() => { store.dispatch(socketRestartGame(gameId)); }}
      primary
    />,
  ];

  const quitGame = [
    <FlatButton
      label="QUIT GAME"
      onClick={() => { window.location = '/'; }}
      primary
    />,
  ];

  const actionsMaster = [
    restartGame,
    quitGame
  ];

  const actionsPlayer = [
    quitGame
  ];

  return (
    <Dialog
      title="GAME OVER"
      actions={isMaster ? actionsMaster : actionsPlayer}
      modal={false}
      open
    >
      {hasWon ? 'YOU WIN !' : 'YOU LOOSE !'}
    </Dialog>
  );
};

EndGame.propTypes = {
  isMaster: PropTypes.bool.isRequired,
  hasWon: PropTypes.bool.isRequired,
  gameId: PropTypes.string.isRequired
};

export default EndGame;
