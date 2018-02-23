import get from 'lodash/get';

import { getRandomPiece } from '../helpers/pieces';

/**
 * Class Piece
 *
 * @param constructor {Object} - init {shape, direction, x, y} (optional)
 */
class Piece {
  constructor(init) {
    this.shape = get(init, 'shape', getRandomPiece());
    this.direction = get(init, 'direction', 0);
    this.x = get(init, 'x', 0);
    this.y = get(init, 'y', 0);
  }
}

export default Piece;
