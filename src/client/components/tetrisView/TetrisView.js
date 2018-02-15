import React from 'react';
import Tetris from '../../containers/tetris/Tetris';
import Players from '../../containers/players/Players';

import './TetrisView.scss';

const TetrisView = () => (
  <div className="tetris-view">
    <Tetris />
    <Players />
  </div>
);

export default TetrisView;
