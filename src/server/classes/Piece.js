import _ from 'lodash';

import pieces from '../helpers/pieces';

/**
 * Class Piece
 *
 * @param constructor {Object} - init {t, dir, x, y}
 */
class Piece {
  constructor(init) {
    this.t = _.get(init, 't', pieces[Math.floor(Math.random() * pieces.length)]);
    this.dir = _.get(init, 'dir', 0);
    this.x = _.get(init, 'x', 0);
    this.y = _.get(init, 'y', 0);
  }
}

export default Piece;
