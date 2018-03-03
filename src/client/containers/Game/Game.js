import React from 'react';
import { connect } from 'react-redux';

import Grid from '../../components/Grid/Grid';

import './Game.scss';

const Game = ({ grid, currentPiece, move }) => (
  <div className="game">
    <Grid grid={grid} currentPiece={currentPiece} />
  </div>
);

const mapStateToProps = state => ({
  grid: state.grid,
  currentPiece: state.currentPiece,
  isPlaying: state.isPlaying
});


export default connect(mapStateToProps)(Game);
