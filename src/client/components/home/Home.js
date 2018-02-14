import React from 'react';

import RTCTest from '../../containers/RTCtest/RTCTest';
import Tetris from '../../containers/tetris/Tetris';
import Players from '../../containers/players/Players';

import './Home.scss';

const Home = () => (
  <div className="container">
    <div className="tetris-view">
      <Tetris />
      <Players />
    </div>
    <RTCTest />
  </div>
);

export default Home;
