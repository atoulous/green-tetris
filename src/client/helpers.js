import { pieces, heightSize, widthSize } from './constants';

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
** Make a full copy of the grid.
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
export function initGrid() {
  const grid = [];
  for (let i = 0; i < heightSize; i++) {
    const row = [];
    for (let j = 0; j < widthSize; j++) {
      row.push({
        fill: false
      });
    }
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

/*
** Check if row is full
*/
export function isRowFull(row) {
  return is(row, (cell) => (cell.fill === true));
}

export function isRowDestroyable(row) {
  return is(row, (cell) => (cell.isDestroyable === true));
}

export function isRowFullAndDestroyable(row) {
  return is(row, (cell) => (cell.isDestroyable === true && cell.fill === true));
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
    let index = x + i;
    let row = grid[index];
    if (row && isRowFullAndDestroyable(row))
      rowsToDelete.push(index);
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


