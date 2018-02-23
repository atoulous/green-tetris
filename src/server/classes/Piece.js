import get from 'lodash/get';

import { getRandomPiece } from '../helpers/pieces';

/**
 * Class Piece
 *
 * @param constructor {Object} - init {form, direction, x, y} (optional)
 */
class Piece {
  constructor(init) {
    this.form = get(init, 'form', getRandomPiece());
    this.direction = get(init, 'direction', 0);
    this.x = get(init, 'x', 0);
    this.y = get(init, 'y', 0);
  }
}

export default Piece;
