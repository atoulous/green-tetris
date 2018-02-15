import React from 'react';
import { connect } from 'react-redux';

import { move } from '../../actions/tetris';
import Grid from '../../components/Grid/Grid';

import './Game.scss';

const Game = ({ grid, currentPiece, isPlaying, move }) => (
  <div className="game">
    <Grid grid={grid} currentPiece={currentPiece} isPlaying={isPlaying} move={move} />
  </div>
);

const mapStateToProps = state => ({
  grid: state.grid,
  currentPiece: state.currentPiece,
  isPlaying: state.isPlaying
});

const mapDispatchToProps = dispatch => ({
  move: (e) => {
    dispatch(move(e));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
