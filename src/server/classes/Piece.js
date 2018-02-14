import pieces from '../helpers/pieces';

/**
 * Class Piece
 *
 * @param constructor {Object} - t, dir, x, y
 */
class Piece {
  constructor({ t, dir, x, y }) {
    this.t = t || pieces[Math.floor(Math.random() * pieces.length)];
    this.dir = dir || 0;
    this.x = x || 0;
    this.y = y || 0;
  }
}

export default Piece;
