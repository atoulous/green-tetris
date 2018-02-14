import React from 'react';

import RTCTest from '../../containers/RTCtest/RTCTest';
import TetrisView from '../tetrisView/TetrisView';

import './Home.scss';

const Home = () => (
  <div>
    <TetrisView />
    <RTCTest />
  </div>
);

export default Home;
