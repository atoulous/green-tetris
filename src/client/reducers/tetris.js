import * as tetrisHelper from '../utils/tetris';

/**
 * On/off
 */
export function togglePlay(state) {
  return { ...state, isPlaying: !state.isPlaying };
}

/**
 * Draw `state.currentPiece` on `state.grid`.
 */
export function drawPiece(state) {
  const { grid, currentPiece } = state;

  const gridCopy = tetrisHelper.copyGrid(grid);
  tetrisHelper.forEachBlockInPiece(currentPiece, (x, y) => {
    const cell = gridCopy[x][y];
    cell.fill = true;
    cell.color = currentPiece.t.color;
  });

  return { ...state, grid: gridCopy };
}

/**
 * Erase `state.currentPiece` on `state.grid`.
 */
export function erasePiece(state) {
  const { grid, currentPiece } = state;

  const gridCopy = tetrisHelper.copyGrid(grid);
  tetrisHelper.forEachBlockInPiece(currentPiece, (x, y) => {
    const cell = gridCopy[x][y];
    cell.fill = false;
  });

  return { ...state, grid: gridCopy };
}

/**
 * Replace `state.currentPiece`.
 */
export function setPiece(state, piece) {
  return { ...state, currentPiece: piece };
}

/**
 * Replace `state.currentPiece` with first piece enqueued.
 *
 * @param state
 * @returns {any & {currentPiece: {t: *, dir: number, x: number, y: number}, bag: *}}
 */
export function setNewPiece(state) {
  // const piece = state.piecesQueue.shift();

  // console.log('piece==', piece);

  // return { ...state, currentPiece: piece };

  const currentBag = state.bag.length ? state.bag : tetrisHelper.initBag();
  const indexPiece = tetrisHelper.getRandomPieceFromBag(currentBag);
  const piece = {
    t: currentBag[indexPiece],
    dir: 0,
    x: 0,
    y: 0
  };
  const nextBag = tetrisHelper.sliceBagFromIndex(currentBag, indexPiece);
  return Object.assign(state, { currentPiece: piece, bag: nextBag });
}

/**
 * Refresh `state.gridWithoutCurrent` for later comparisons.
 */
export function refreshGridWithoutCurrent(state) {
  return { ...state, gridWithoutCurrent: tetrisHelper.copyGrid(state.grid) };
}

/**
 * Increase `state.speed` to 1/10s.
 */
export function increaseSpeed(state) {
  return { ...state, speed: state.speed - 100 };
}

/**
 * Replace full rows by empty rows on top of the Grid.
 */
export function deleteRows(state, rowsToDelete) {
  const { grid } = state;
  let newGrid = grid;

  rowsToDelete.forEach((row) => {
    newGrid = tetrisHelper.sliceBagFromIndex(newGrid, row);
    newGrid.unshift(tetrisHelper.initRow());
  });
  return { ...state, grid: newGrid };
}

/**
 * Add full Row to the bottom of the Grid.
 *
 * todo: simply understanding, up all blocks when we add bottom row.
 */
export function addRow(state) {
  let { grid, gridWithoutCurrent } = state;

  function _addRowToGrid(currentGrid) {
    const newGrid = tetrisHelper.copyGrid(currentGrid);
    let added = false;
    tetrisHelper.reverseForeach(currentGrid, (row, index) => {
      if (!added && !tetrisHelper.isRowFull(row)) {
        newGrid[index] = tetrisHelper.initRow(true);
        added = true;
      }
    });
    return newGrid;
  }

  grid = _addRowToGrid(grid);
  gridWithoutCurrent = _addRowToGrid(gridWithoutCurrent);

  return { ...state, grid, gridWithoutCurrent };
}

/**
 * Update Spectrum from Grid.
 */
export function updateSpectrum(state, grid) {
  return { ...state, spectrum: tetrisHelper.getSpectrum(grid)};
}

/**
 * Add value to Player score.
 */
export function updateScore(state, score) {
  return { ...state, score: state.score + score};
}
