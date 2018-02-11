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
