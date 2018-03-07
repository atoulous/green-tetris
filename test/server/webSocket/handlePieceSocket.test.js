import handlePieceSocket from '../../../src/server/webSocket/handlePieceSocket';
import Player from '../../../src/server/classes/Player';
import Game from '../../../src/server/classes/Game';
import MockSocket from '../classes/MockSocket';
import * as handleSocketException from '../../../src/server/webSocket/handleSocketException';

describe('webSocket/handlePieceSocket', () => {
  let player;
  let game;

  beforeAll(() => {
    player = new Player(new MockSocket());
    game = new Game(player.get('id'));
  });

  it('should get send one piece and decrement game bag', () => {
    const data = { path: '/new', gameId: game.get('id') };
    handlePieceSocket(player.get('id'), data);
    // Game bag must decrement of two piece (to 11 pieces)
    expect(game.bag.bag.length).toBe(12);
  });

  it('should get send one piece and decrement game bag', () => {
    const data = { path: '/new', gameId: game.get('id') };
    handlePieceSocket(player.get('id'), data);
    // Game bag must decrement of two piece (to 11 pieces)
    expect(game.bag.bag.length).toBe(11);
  });

  it('should trigger default and do nothing', () => {
    const data = { path: 'this is test', gameId: game.get('id') };
    handlePieceSocket(player.get('id'), data);
    // Game bag must decrement of two piece (to 11 pieces)
    expect(game.bag.bag.length).toBe(11);
  });

  it('should trigger default and throw exception', () => {
    const data = {};
    const spy = jest.spyOn(handleSocketException, 'handleSocketException');

    handlePieceSocket(player.get('id'), data);

    expect(spy).toHaveBeenCalled();
  });
});
