import React from 'react';

import RTCTest from '../../containers/RTCtest/RTCTest';
import NewGameButton from '../../containers/NewGameButton/NewGameButton';
import SetNicknameButton from '../../containers/SetNicknameButton/SetNicknameButton';
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
    <NewGameButton />
    <SetNicknameButton />
  </div>
);

export default Home;
