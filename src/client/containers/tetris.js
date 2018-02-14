import React from 'react';
import Divider from 'material-ui/Divider';

import Score from './Score';
import Game from './Game';
import NextPiece from '../components/NextPiece/NextPiece';


const Tetris = () => (
  <div className="tetris">
    <div className="tetris-meta">
      <Score />
      <NextPiece />
    </div>
    <Divider style={{ marginBottom: '40px' }} />
    <Game />
  </div>
);

export default Tetris;
