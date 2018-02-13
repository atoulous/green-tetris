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

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
