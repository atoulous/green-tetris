import handlePlayerSocket from '../../../src/server/webSocket/handlePlayerSocket';
import Player from '../../../src/server/classes/Player';
import Game from '../../../src/server/classes/Game';
import SocketException from '../../../src/server/classes/SocketException';
import MockSocket from '../classes/MockSocket';
import { createSocket } from 'dgram';


describe('/webSocket/handlePlayerSocket', () => {
  let player;
  let player2;
  let game;

  beforeAll(() => {
    // Define player as game gameMaster. Add player2 to game.
    player = new Player(new MockSocket());
    player2 = new Player(new MockSocket());
    game = new Game(player.get('id'));
    game.addPlayer(player2.get('id'));
  });

  it('should test /update path', () => {
    const data = { path: '/update', settings: { isReady: true } };
    handlePlayerSocket(player.get('id'), data);
    handlePlayerSocket(player2.get('id'), data);

    // player and player2 should be ready
    expect(player2.get('isReady')).toBe(true);
    expect(player.get('isReady')).toBe(true);
  });

  it('should test /kick path but fail because not from gameMaster', () => {
    const data = { path: '/kick', playerIdToDelete: player2.get('id') };
    handlePlayerSocket(player2.get('id'), data);
    // Players number is the same (2).
    expect(game.get('players').length).toBe(2);
  });

  it('should test /kick path and succeed', () => {
    const data = { path: '/kick', playerIdToDelete: player2.get('id') };
    let exceptionTriggered = false;
    try {
      handlePlayerSocket(player.get('id'), data);
    } catch (e) {
      exceptionTriggered = true;
    }
    // no exception must have been thrown.
    expect(exceptionTriggered).toBe(false);
    // Players number has been decremented (to 1).
    expect(game.get('players').length).toBe(1);
  });

  it('should test /default path', () => {
    const data = { path: 'wrong path' };
    let exceptionTriggered = false;
    try {
      handlePlayerSocket(player.get('id'), data);
    } catch (e) {
      exceptionTriggered = true;
    }
    // No exception must have been thrown. Case has been handled gracefully.
    expect(exceptionTriggered).toBe(false);
  });

  it('should test /deconnexion path', () => {
    // Add a second player to the game.
    const player3 = new Player(new MockSocket());
    const player3Id = player3.get('id');
    game.addPlayer(player3.get('id'));
    // Disconnect it.
    const data = { path: '/deconnexion' };
    handlePlayerSocket(player3.get('id'), data);
    // player3 is not in game anymore. One player left.
    expect(game.get('players').length).toBe(1);
    // player3 is not in Player.allPlayers list anymore.
    const isInPlayersList = Player.allPlayers.find(p => p.get('id') === player3Id);
    expect(isInPlayersList).toBeUndefined();
  });
});
