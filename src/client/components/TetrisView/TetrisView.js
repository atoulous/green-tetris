import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import RTCTest from '../../containers/RTCtest/RTCTest';
import Tetris from '../../containers/Tetris/Tetris';
import TetrisPlayersList from '../../components/TetrisPlayersList/TetrisPlayersList';

import './TetrisView.scss';

import store from '../../store';
import { togglePlay } from '../../actions/tetris';

const TetrisView = () => (
  <div className="container">
    <div className="tetris-view">
      <Tetris />
      <TetrisPlayersList />
    </div>
    {/* start button for testing only */}
    <RaisedButton label="start/stop" style={{ display: 'inherit' }} onClick={() => store.dispatch(togglePlay())} />
    <RTCTest />
  </div>
);

export default TetrisView;
