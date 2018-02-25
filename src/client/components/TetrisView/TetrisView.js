import React from 'react';
import { connect } from 'react-redux';
import Toggle from 'material-ui/Toggle';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import Tetris from '../../containers/Tetris/Tetris';
import TetrisPlayersList from '../../components/TetrisPlayersList/TetrisPlayersList';

import './TetrisView.scss';

import store from '../../store';
import actions from '../../actions';

const { togglePlay, updateGame } = actions;

const TetrisView = ({ game, playerId, onPause, dispatch }) => {
  if (!game) return <Redirect to="/" />;

  const player = game.players.find(p => p.id === playerId);
  if (!player) throw Error('Player not found');
  const isMaster = (player.id === game.masterId);
  const { hasLost } = player;
  const { hasFinished } = game;
  const isSolo = game.players.length === 1;
  let winner;
  if (hasFinished) winner = game.players.find(p => p.hasLost !== true);

  const _closeModal = () => {
    dispatch(updateGame(null));
  };

  const _restartGame = () => {
    console.log('Restart game');
  };

  const actionsModal1 = [
    <FlatButton
      label="Ok"
      onClick={_closeModal}
      primary
    />,
  ];

  const actionsModal2 = [
    <FlatButton
      label="Ok"
      onClick={_closeModal}
      primary
    />,
  ];

  if (isMaster && isSolo) {
    actionsModal1.push(<FlatButton
      label="Restart"
      onClick={_restartGame}
      primary
    />);
  }

  if (isMaster) {
    actionsModal2.push(<FlatButton
      label="Restart"
      onClick={_restartGame}
      primary
    />);
  }

  return (
    <div>
      <Dialog
        title="Game"
        actions={actionsModal1}
        modal={false}
        open={hasLost}
        onRequestClose={_closeModal}
      >
        {'Looser, you lost the game !'}
      </Dialog>
      <Dialog
        title="Game"
        actions={actionsModal2}
        modal={false}
        open={hasFinished && !isSolo}
        onRequestClose={_closeModal}
      >
        {`Game is over! ${winner && winner.nickname} won the game.`}
      </Dialog>
      <div className="container">
        <div className="tetris-view">
          <Tetris game={game} playerId={playerId} />
          <TetrisPlayersList game={game} playerId={playerId} />
        </div>
        <Toggle label="Pause Game" onToggle={() => store.dispatch(togglePlay())} toggled={onPause} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  game: state.game,
  playerId: state.player.id,
  onPause: state.onPause,
});

TetrisView.propTypes = {
  game: PropTypes.object,
  playerId: PropTypes.string,
  onPause: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

TetrisView.defaultProps = {
  game: null,
  playerId: null,
  onPause: false,
};

export default connect(mapStateToProps)(TetrisView);
