import  actions from '../actions';
import { tetris as initialState, initBag } from './init';
import { forEachBlockInPiece, copyGrid } from '../helpers';
import { getRandomPieceFromBag, sliceBagFromIndex } from './utils';

const { DRAW_PIECE, ERASE_PIECE, SET_PIECE, TOGGLE_PLAY, SET_NEW_PIECE, REFRESH_GRID_WITHOUT_CURRENT, INCREASE_SPEED } = actions;
/*
** On/off
*/
function togglePlay(state) {
  return { ...state, isPlaying: !state.isPlaying };
}
/*
** Draw `state.currentPiece` on `state.grid`.
*/
function drawPiece(state) {
  const { grid, currentPiece } = state;

  const gridCopy = copyGrid(grid);
  forEachBlockInPiece(currentPiece, (x, y) => {
    const cell = gridCopy[x][y];
    cell.fill = true;
    cell.color = currentPiece.t.color;
  });
  return Object.assign({}, state, { grid: gridCopy });
}
/*
** Erase `state.currentPiece` on `state.grid`.
*/
function erasePiece(state) {
  const { grid, currentPiece } = state;

  const gridCopy = copyGrid(grid);
  forEachBlockInPiece(currentPiece, (x, y) => {
    const cell = gridCopy[x][y];
    cell.fill = false;
  });
  return Object.assign({}, state, { grid: gridCopy });
}
/*
** Replace `state.currentPiece`.
*/
function setPiece(state, piece) {
  return Object.assign(state, { currentPiece: piece });
}
/*
** Replace `state.currentPiece` with random piece.
*/
function setNewPiece(state) {
  const currentBag = state.bag.length ? state.bag : initBag();
  const indexPiece = getRandomPieceFromBag(currentBag);
  console.log(indexPiece);
  const piece = {
    t: currentBag[indexPiece],
    dir: 0,
    x: 0,
    y: 0
  };
  const nextBag = sliceBagFromIndex(currentBag, indexPiece);
  return Object.assign(state, { currentPiece: piece, bag: nextBag });
}
/*
** Refresh `state.gridWithoutCurrent` for later comparisons.
*/
function refreshGridWithoutCurrent(state) {
  return Object.assign(state, { gridWithoutCurrent: copyGrid(state.grid) });
}
/*
** Increase `state.speed` to 1/10s.
*/
function increaseSpeed(state) {
  return Object.assign(state, { speed: state.speed - 100 });
}

/*
** Reducer for tetris-related operations.
*/
function tetris(state = initialState, action) {
  switch (action.type) {
    case DRAW_PIECE:
      return drawPiece(state);
    case ERASE_PIECE:
      return erasePiece(state);
    case SET_PIECE:
      return setPiece(state, action.piece);
    case SET_NEW_PIECE:
      return setNewPiece(state);
    case REFRESH_GRID_WITHOUT_CURRENT:
      return refreshGridWithoutCurrent(state);
    case INCREASE_SPEED:
      return increaseSpeed(state);
    case TOGGLE_PLAY:
      return togglePlay(state);
    default:
      return state;
  }
}

export default tetris;

