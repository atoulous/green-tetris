import Bag from '../../../src/server/classes/Bag';
import Piece from '../../../src/server/classes/Piece';

describe('classes/bag', () => {
  const bag = new Bag();

  it('should instance a new Bag of pieces', async () => {
    expect(bag).toBeTruthy();
    expect(bag).toHaveProperty('bag');
  });

  it('should take pieces off the bag', async () => {
    // Get piece off the bag. 13 pieces remaining.
    const piece = bag.getRandomPiece();

    expect(piece).toBeInstanceOf(Piece);
    expect(piece).toHaveProperty('shape');
    expect(piece).toHaveProperty('direction');
    expect(piece).toHaveProperty('x');
    expect(piece).toHaveProperty('y');

    expect(bag.bag.length).toBe(13);
  });
});
