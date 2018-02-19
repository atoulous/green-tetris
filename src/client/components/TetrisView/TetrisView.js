import React from 'react';

import RTCTest from '../../containers/RTCtest/RTCTest';
import Tetris from '../../containers/Tetris/Tetris';
import TetrisPlayersList from '../../components/TetrisPlayersList/TetrisPlayersList';

import './TetrisView.scss';

const Home = () => (
  <div className="container">
    <div className="tetris-view">
      <Tetris />
      <TetrisPlayersList />
    </div>
    <RTCTest />
  </div>
);

export default Home;
