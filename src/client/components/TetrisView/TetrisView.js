import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Tetris from '../../containers/Tetris/Tetris';
import TetrisPlayersList from '../../components/TetrisPlayersList/TetrisPlayersList';

import './TetrisView.scss';

import EndGame from '../../containers/EndGame/EndGame';

const TetrisView = ({ game, playerId, onPause, hasWon }) => {
  if (!game) return <Redirect to="/" />;
  if (!game.hasStarted) return <Redirect to={`/games/${game.id}`} />;

  return (
    <div>
      {
        (hasWon === false || hasWon) &&
          <EndGame
            hasWon={hasWon}
            isMaster={game.masterId === playerId}
            gameId={game.id}
          />
      }
      {
        hasWon === null &&
        <div className="container">
          <div className="tetris-view">
            <Tetris game={game} playerId={playerId} onPause={onPause} />
            <TetrisPlayersList game={game} playerId={playerId} />
          </div>
        </div>
      }
    </div>
  );
};

const mapStateToProps = state => ({
  game: state.game,
  playerId: state.player.id,
  onPause: state.onPause,
  hasWon: state.hasWon,
});

TetrisView.propTypes = {
  game: PropTypes.object,
  playerId: PropTypes.string,
  onPause: PropTypes.bool,
  hasWon: PropTypes.bool,
};

TetrisView.defaultProps = {
  game: null,
  playerId: null,
  onPause: false,
  hasWon: null,
};

export default connect(mapStateToProps)(TetrisView);
