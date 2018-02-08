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