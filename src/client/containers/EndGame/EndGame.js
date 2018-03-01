import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { socketRestartGame } from '../../actions/socket';

const GameEnd = ({ isMaster, hasWon, gameId, dispatch }) => {
  const restartGame = [
    <FlatButton
      label="RESTART GAME"
      onClick={() => { dispatch(socketRestartGame(gameId)); }}
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

GameEnd.propTypes = {
  isMaster: PropTypes.bool.isRequired,
  hasWon: PropTypes.bool.isRequired,
  gameId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(GameEnd);
