import get from 'lodash/get';

import { initBag } from '../helpers/pieces';

const bag = initBag();

/**
 * Class Piece
 *
 * @param constructor {Object} - init {form, direction, x, y} (optional)
 */
class Piece {
  constructor(init) {
    this.form = get(init, 'form', bag[Math.floor(Math.random() * bag.length)]);
    this.direction = get(init, 'direction', 0);
    this.x = get(init, 'x', 0);
    this.y = get(init, 'y', 0);
  }
}

export default Piece;
