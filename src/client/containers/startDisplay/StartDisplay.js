import React from 'react';

import { connect } from 'react-redux';
<<<<<<< HEAD:src/client/containers/startDisplay.js
import { togglePlay } from '../actions/Tetris';
=======
import { togglePlay } from '../../actions/tetris';
>>>>>>> master:src/client/containers/startDisplay/StartDisplay.js

let StartDisplay = ({ isPlaying, start }) => <button onClick={start}>{isPlaying ? 'Stop' : 'Start'}</button>;

const mapDispatchToProps = dispatch => ({
  start: () => {
    dispatch(togglePlay());
  }
});

const mapStateToProps = state => ({
  isPlaying: state.isPlaying
});

export default (StartDisplay = connect(mapStateToProps, mapDispatchToProps)(StartDisplay));
