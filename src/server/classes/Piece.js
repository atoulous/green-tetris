import get from 'lodash/get';
import Payload from './Payload';


const _allPieces = [
  { blocks: [0x0f00, 0x2222, 0x00f0, 0x4444], color: 'cyan' },
  { blocks: [0x44c0, 0x8e00, 0x6440, 0x0e20], color: 'blue' },
  { blocks: [0x4460, 0x0e80, 0xc440, 0x2e00], color: 'orange' },
  { blocks: [0xcc00, 0xcc00, 0xcc00, 0xcc00], color: 'yellow' },
  { blocks: [0x06c0, 0x8c40, 0x6c00, 0x4620], color: 'green' },
  { blocks: [0x0e40, 0x4c40, 0x4e00, 0x4640], color: 'purple' },
  { blocks: [0x0c60, 0x4c80, 0xc600, 0x2640], color: 'red' }
];

/**
 * Class Piece
 *
 * @param constructor {Object} - init {shape, direction, x, y} (optional)
 */
class Piece extends Payload {
  constructor(init) {
    super({
      shape: get(init, 'shape', Piece.getRandom()),
      direction: get(init, 'direction', 0),
      x: get(init, 'x', 0),
      y: get(init, 'y', 0),
    });
  }

  format(props = ['shape', 'direction', 'x', 'y']) {
    return super.format(props);
  }

  static getRandom() {
    const index = Math.floor(Math.random() * _allPieces.length);
    return _allPieces[index];
  }
}

export default Piece;
