import handlePieceSocket from '../../../src/server/webSocket/handlePieceSocket';
import Player from '../../../src/server/classes/Player';
import Game from '../../../src/server/classes/Game';
import SocketException from '../../../src/server/classes/SocketException';
import MockSocket from '../classes/MockSocket';

describe('webSocket/handlePieceSocket', () => {
  let player;
  let game;

  beforeAll(() => {
    player = new Player(new MockSocket());
    game = new Game(player.get('id'));
  });

  it('should get send one piece and decrement game bag', () => {
    const data = { path: 'newPiece', gameId: game.get('id') };
    handlePieceSocket(player.get('id'), data);
    // Game bag must decrement of two piece (to 13 pieces)
    expect(game.bag.bag.length).toBe(13);
  });

  it('should get send one piece and decrement game bag', () => {
    const data = { path: 'newPiece', gameId: game.get('id') };
    handlePieceSocket(player.get('id'), data);
    // Game bag must decrement of two piece (to 13 pieces)
    expect(game.bag.bag.length).toBe(13);
  });
});
