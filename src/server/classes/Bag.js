import Piece from './Piece';

/**
 * All possible pieces
 */
const pieces = {
  i: { blocks: [0x0f00, 0x2222, 0x00f0, 0x4444], color: 'cyan' },
  j: { blocks: [0x44c0, 0x8e00, 0x6440, 0x0e20], color: 'blue' },
  l: { blocks: [0x4460, 0x0e80, 0xc440, 0x2e00], color: 'orange' },
  o: { blocks: [0xcc00, 0xcc00, 0xcc00, 0xcc00], color: 'yellow' },
  s: { blocks: [0x06c0, 0x8c40, 0x6c00, 0x4620], color: 'green' },
  t: { blocks: [0x0e40, 0x4c40, 0x4e00, 0x4640], color: 'purple' },
  z: { blocks: [0x0c60, 0x4c80, 0xc600, 0x2640], color: 'red' }
};


/**
 * Class Bag
 * @param constructor {String} - masterId
 *
 */
class Bag {
  constructor() {
    this.bag = [];
    this._initBag();
  }

  getRandomPiece() {
    if (!this.bag.length) this._initBag();

    // Choose a random index among bag.
    const index = Math.floor(Math.random() * this.bag.length);
    const piece = this.bag[index];

    // Take piece off bag.
    this.bag.splice(index, 1);

    return new Piece({ shape: piece });
  }

  static get pieces() {
    return pieces;
  }

  _initBag() {
    return Object.keys(Bag.pieces).forEach(key => this.bag.push(Bag.pieces[key], Bag.pieces[key]));
  }
}

export default Bag;
