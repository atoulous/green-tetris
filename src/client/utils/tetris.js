import { pieces, heightSize, widthSize } from '../constants';

/*
** Will apply func on every block of piece.
*/
export function forEachBlockInPiece({
  x, y, t, dir
}, func) {
  let row = 0;
  let column = 0;
  const piece = t.blocks[dir];
  for (let bin = 0x8000; bin > 0; bin >>= 1) {
    if (bin & piece) {
      func(x + column, y + row);
    }
    if (++column === 4) {
      column = 0;
      row++;
    }
  }
}
/*
** Tells if we can draw a piece.
*/
export function isPiecePlacable(piece, grid) {
  let result = true;
  forEachBlockInPiece(piece, (x, y) => {
    if (!result || !grid[x] || !grid[x][y] || grid[x][y].fill === true) { result = false; }
  });
  return result;
}
/*
** Make a full copy of the Grid.
*/
export function copyGrid(grid) {
  return grid.map(row => row.map(cell => ({ ...cell })));
}

/*
** Randomization of pieces.
*/
export function getRandomPieceFromBag(bag) {
  return Math.floor(Math.random() * bag.length);
}
/*
** Return new array without elem at index.
*/
export function sliceBagFromIndex(bag, index) {
  if (bag.length === 1) return [];
  return [...bag.slice(0, index), ...bag.slice(index + 1)];
}

// Init array of arrays with all cells as objects.
export function initGrid(height = heightSize, width = widthSize) {
  const grid = [];
  for (let i = 0; i < height; i++) {
    const row = initRow(false, width);
    grid.push(row);
  }
  return grid;
}

// Init new bag of pieces for randomization.
export function initBag() {
  const bag = [];
  Object.keys(pieces).forEach((piece) => {
    const pieceCopy = Object.assign({}, pieces[piece]);
    bag.push(pieceCopy);
    bag.push(pieceCopy);
  });
  return bag;
}

export function initRow(isFilled = false, width = widthSize) {
  const row = [];
  for (let j = 0; j < width; j++) {
    row.push({
      fill: isFilled,
      color: 'grey',
      isDestroyable: !isFilled,
    });
  }
  return row;
}

export function initSpectrum() {
  const spectrum = [];
  for (let i = 0; i < widthSize; i++) {
    spectrum.push(heightSize);
  }
  return spectrum;
}

/*
** Check if Row is full
*/
export function isRowFull(row) {
  return is(row, cell => (cell.fill === true));
}

export function isRowDestroyable(row) {
  return is(row, cell => (cell.isDestroyable === true));
}

export function isRowFullAndDestroyable(row) {
  return is(row, cell => (cell.isDestroyable === true && cell.fill === true));
}

export function reverseForeach(array, f) {
  if (array.length == 0) return;
  for (let i = array.length - 1; i >= 0; i--) {
    f(array[i], i);
  }
}

export function checkRowsToDelete(grid, x) {
  const rowsToDelete = [];
  for (let i = 0; i < 4; i++) {
    const index = x + i;
    const row = grid[index];
    if (row && isRowFullAndDestroyable(row)) { rowsToDelete.push(index); }
  }
  return rowsToDelete;
}

function is(array, f) {
  let is = true;
  array.forEach((e, i) => {
    if (!f(e)) is = false;
  });
  return is;
}
/*
** Takes Grid, return array of int representing Spectrum
*/
export function getSpectrum(grid) {
  const spectrum = initSpectrum();
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      const spectrumValue = spectrum[cellIndex];
      if (cell.fill === true && rowIndex < spectrumValue) {
        spectrum[cellIndex] = rowIndex;
      }
    });
  });
  return spectrum;
}

