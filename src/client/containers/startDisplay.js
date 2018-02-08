import React from 'react';

import { connect } from 'react-redux';
import { togglePlay } from '../actions/tetris';

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
