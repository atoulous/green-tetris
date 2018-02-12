import {
  checkRowsToDelete,
  initRow,
  initBag,
  forEachBlockInPiece,
  copyGrid,
  getRandomPieceFromBag,
  sliceBagFromIndex,
  isRowFull, reverseForeach 
} from '../helpers';

/*
** On/off
*/
export function togglePlay(state) {
  return { ...state, isPlaying: !state.isPlaying };
}
/*
** Draw `state.currentPiece` on `state.grid`.
*/
export function drawPiece(state) {
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
export function erasePiece(state) {
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
export function setPiece(state, piece) {
  return Object.assign(state, { currentPiece: piece });
}
/*
** Replace `state.currentPiece` with random piece.
*/
export function setNewPiece(state) {
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
export function refreshGridWithoutCurrent(state) {
  return Object.assign(state, { gridWithoutCurrent: copyGrid(state.grid) });
}
/*
** Increase `state.speed` to 1/10s.
*/
export function increaseSpeed(state) {
  return Object.assign(state, { speed: state.speed - 100 });
}
/*
** Replace full rows by empty rows on top of the grid.
*/
export function deleteRows(state, rowsToDelete) {
  const { grid } = state;
  let newGrid = grid;

  rowsToDelete.forEach((row) => {
    newGrid = sliceBagFromIndex(newGrid, row);
    newGrid.unshift(initRow());
  });
  return Object.assign({}, state, { grid: newGrid });
}
/*
** Add full row to the bottom of the grid.
*/
export function addRow(state) {
  const { grid, gridWithoutCurrent } = state;
  
  function addRowToGrid(grid) {
    let newGrid = copyGrid(grid);
    let added = false;
    reverseForeach(grid, (row, index) => {
      if (!added && !isRowFull(row)) {
        newGrid[index] = initRow(true);
        added = true;
      }
    })
    return newGrid;
  }
  return Object.assign({}, state, { grid: addRowToGrid(grid), gridWithoutCurrent: addRowToGrid(gridWithoutCurrent) });
}

