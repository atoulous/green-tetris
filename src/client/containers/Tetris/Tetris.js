import React from 'react';
import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types';

import Score from '../Score/Score';
import Game from '../Game/Game';
import NextPiece from '../NextPiece/NextPiece';

import './Tetris.scss';

const Tetris = ({ game, playerId }) => {
  const self = game.players.find(p => p.id === playerId) || {};
  console.log('self', self);
  const selfScore = self.score;

  return (
    <div className="tetris">
      <div className="tetris-meta">
        <div className="tetris-meta-container">
          <Score score={selfScore} />
          <NextPiece />
        </div>
      </div>
      <Divider style={{ marginBottom: '40px', marginTop: '40px' }} />
      <Game />
    </div>
  );
};

Tetris.propTypes = {
  game: PropTypes.object,
  playerId: PropTypes.string,
};

Tetris.defaultProps = {
  game: null,
  playerId: null,
};

export default Tetris;
