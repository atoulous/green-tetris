import React from 'react';
import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';

import Score from '../Score/Score';
import Game from '../Game/Game';
import NextPiece from '../NextPiece/NextPiece';

import store from '../../store';
import { togglePlay } from '../../actions/tetris';
import AudioContainer from '../../containers/AudioContainer/AudioContainer';
import './Tetris.scss';

const Tetris = ({ game, playerId, onPause }) => {
  const self = game.players.find(p => p.id === playerId) || {};
  const selfScore = self.score;

  return (
    <div className="tetris">
      <div className="tetris-meta">
        <div className="togglesContainer">
          <div className="audioContainer">
            <AudioContainer />
          </div>
          <div>
            <Toggle label="Pause Game" onToggle={() => store.dispatch(togglePlay())} toggled={onPause} />
          </div>
        </div>
        <Score score={selfScore} />
        <NextPiece />
      </div>
      <Divider style={{ marginBottom: '40px', marginTop: '40px' }} />
      <Game />
    </div>
  );
};

Tetris.propTypes = {
  game: PropTypes.object,
  playerId: PropTypes.string,
  onPause: PropTypes.bool,
};

Tetris.defaultProps = {
  game: null,
  playerId: null,
  onPause: false,
};

export default Tetris;
