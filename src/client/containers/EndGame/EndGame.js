import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


import { socketRestartGame } from '../../actions/socket';

const GameEnd = ({ isMaster, hasWon, gameId, dispatch }) => {
  const actionsModal = [
    <FlatButton
      label="RESTART GAME"
      onClick={() => { dispatch(socketRestartGame(gameId)); }}
      primary
    />,
  ];

  return (
    <Dialog
      title="Fin de partie"
      actions={isMaster ? actionsModal : []}
      modal={false}
      open
    >
      {hasWon ? 'bravo t es un champion ! ' : 'tes mauvais jack'}
    </Dialog>
  );
};

export default connect()(GameEnd);
