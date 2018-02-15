import React from 'react';
import Tetris from '../../containers/Tetris/Tetris';
import Players from '../../containers/Players/Players';

import './TetrisView.scss';

const TetrisView = () => (
  <div className="tetris-view">
    <Tetris />
    <Players />
  </div>
);

export default TetrisView;
