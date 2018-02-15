import React from 'react';

import RTCTest from '../../containers/RTCtest/RTCTest';
import Tetris from '../../containers/Tetris/Tetris';
import Players from '../../containers/Players/Players';

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
