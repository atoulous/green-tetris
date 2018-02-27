import Piece from '../../../src/server/classes/Piece';

describe('classes/piece', () => {
  it('should instance a new Piece', async () => {
    const newPiece = new Piece();
    const payload = newPiece.getPayload();

    expect(newPiece).toBeTruthy();
    expect(payload).toHaveProperty('shape');
    expect(payload).toHaveProperty('direction', 0);
    expect(payload).toHaveProperty('x', 0);
    expect(payload).toHaveProperty('y', 0);
  });

  it('should get a random shape', async () => {
    const randomShape = Piece.getRandom();

    expect(randomShape).toBeTruthy();
    expect(randomShape).toHaveProperty('blocks');
    expect(randomShape).toHaveProperty('color');
  });
});
