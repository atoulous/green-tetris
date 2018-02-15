import React from 'react';
import Divider from 'material-ui/Divider';

import Score from '../score/Score';
import Game from '../game/Game';
import NextPiece from '../nextPiece/NextPiece';

import './Tetris.scss';


const Tetris = () => (
  <div className="tetris">
    <div className="tetris-meta">
      <div className="tetris-meta-container">
        <Score />
        <NextPiece />
      </div>
    </div>
    <Divider style={{ marginBottom: '40px' }} />
    <Game />
  </div>
);

export default Tetris;
