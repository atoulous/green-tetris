import { connect } from "react-redux";
import {
  movePieceLeft,
  movePieceRight,
  rotatePiece,
  movePieceDown
} from "../actions/tetris";
import Grid from "../components/grid";

const mapStateToProps = state => {
  return {
    grid: state.tetris.grid,
    currentPiece: state.tetris.currentPiece,
    isPlaying: state.isPlaying
  };
};

const mapDispatchToProps = dispatch => {
  return {
    movePieceLeft: () => {
      dispatch(movePieceLeft());
    },
    movePieceRight: () => {
      dispatch(movePieceRight());
    },
    rotatePiece: () => {
      dispatch(rotatePiece());
    },
    movePieceDown: () => {
      dispatch(movePieceDown());
    }
  };
};

const GridContainer = connect(mapStateToProps, mapDispatchToProps)(Grid);

export default GridContainer;
