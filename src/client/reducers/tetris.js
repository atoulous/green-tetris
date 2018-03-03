import * as tetrisHelper from '../utils/tetris';
import { sendDataToPeers, getPeer } from '../helpers/webRTC';

/**
 * On/off
 */
export function togglePlay(state) {
  return { ...state, onPause: !state.onPause };
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
    cell.color = currentPiece.shape.color;
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
 * Add piece received by web socket to end of queue
 *
 * @param state
 * @param newPiece
 * @returns {{piecesQueue}}
 */
export function addPieceToQueue(state, action) {
  return {
    ...state,
    piecesQueue: [...state.piecesQueue, action.newPiece] };
}

/**
 * Replace `state.currentPiece` with first piece enqueued
 *
 * @param state
 * @returns {*}
 */
export function setNewPiece(state) {
  const { piecesQueue } = state;
  if (piecesQueue.length) {
    const piece = piecesQueue.shift();
    return { ...state, currentPiece: piece };
  }

  // else if no piece in queue, legacy
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
  const rowWidth = (state.game.size.value * 2) / 3;
  let newGrid = grid;

  rowsToDelete.forEach((row) => {
    newGrid = tetrisHelper.sliceBagFromIndex(newGrid, row);
    newGrid.unshift(tetrisHelper.initRow(false, rowWidth));
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
  const rowWidth = (state.game.size.value * 2) / 3;

  function _addRowToGrid(currentGrid) {
    const newGrid = tetrisHelper.copyGrid(currentGrid);
    let added = false;
    tetrisHelper.reverseForeach(currentGrid, (row, index) => {
      if (!added && !tetrisHelper.isRowFull(row)) {
        newGrid[index] = tetrisHelper.initRow(true, rowWidth);
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
  const spectrum = tetrisHelper.getSpectrum(grid);
  sendDataToPeers(JSON.stringify({ peer: getPeer().id, spectrum }));
  return { ...state, spectrum };
}

/**
 * Add value to Player score.
 */
export function updateScore(state, score) {
  return { ...state, score: state.score + score };
}

/**
 * Set grid related to size
 */
export function setGrid(state) {
  const { size } = state.game;
  const height = size.value || 20;
  return { ...state,
    grid: tetrisHelper.initGrid(height, ((height * 2) / 3)),
    gridWithoutCurrent: tetrisHelper.initGrid(height, ((height * 2) / 3)),
  };
}

/*
** Just to know if we already listen to key events
*/
export function isListeningKey(state) {
  return { ...state, isListeningKey: !state.isListeningKey };
}
