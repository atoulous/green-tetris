import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Tetris from '../../containers/Tetris/Tetris';
import TetrisPlayersList from '../../components/TetrisPlayersList/TetrisPlayersList';
import EndGame from '../../containers/EndGame/EndGame';

import { move, isListeningKey } from '../../actions/tetris';
import './TetrisView.scss';


const TetrisView = ({ game, playerId, onPause, hasWon, move, isListeningKey }) => {
  if (!isListeningKey) move();
  if (!game) return <Redirect to="/" />;
  if (!game.hasStarted) return <Redirect to={`/games/${game.id}`} />;

  return (
    <div className="container">
      <div className="tetris-view">
        <Tetris game={game} playerId={playerId} onPause={onPause} />
        <TetrisPlayersList game={game} playerId={playerId} />
      </div>

      {
        (hasWon === false || hasWon) &&
        <EndGame
          hasWon={hasWon}
          isMaster={game.masterId === playerId}
          gameId={game.id}
        />
      }

    </div>
  );
};

const mapStateToProps = state => ({
  game: state.game,
  playerId: state.player.id,
  onPause: state.onPause,
  hasWon: state.hasWon,
  isListeningKey: state.isListeningKey,
});

const mapDispatchToProps = dispatch => ({
  move: () => {
    window.addEventListener('keydown', e => dispatch(move(e)));
    dispatch(isListeningKey());
  },
});

TetrisView.propTypes = {
  game: PropTypes.object,
  playerId: PropTypes.string,
  onPause: PropTypes.bool,
  hasWon: PropTypes.bool,
  move: PropTypes.func.isRequired,
  isListeningKey: PropTypes.bool.isRequired
};

TetrisView.defaultProps = {
  game: null,
  playerId: null,
  onPause: false,
  hasWon: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(TetrisView);
