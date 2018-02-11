import { connect } from 'react-redux';
import {
  move
} from '../actions/tetris';
import Grid from '../components/grid';

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

const GridContainer = connect(mapStateToProps, mapDispatchToProps)(Grid);

export default GridContainer;
