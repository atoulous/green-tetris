import Piece from '../../../src/server/classes/Piece';

describe('classes/piece', () => {
  it('should instance new piece well', async () => {
    const newPiece = new Piece();

    expect(newPiece).toBeTruthy();
    expect(newPiece).toHaveProperty('form');
    expect(newPiece).toHaveProperty('direction', 0);
    expect(newPiece).toHaveProperty('x', 0);
    expect(newPiece).toHaveProperty('y', 0);
  });
});
