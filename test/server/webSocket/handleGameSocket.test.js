import handleGameSocket from '../../../src/server/webSocket/handleGameSocket';
import Player from '../../../src/server/classes/Player';
import Game from '../../../src/server/classes/Game';
import SocketException from '../../../src/server/classes/SocketException';
import MockSocket from '../classes/MockSocket';


describe('webSocket/handleGameScoket', () => {
  describe('create a game', () => {
    it('should test the /create path with no settings', () => {
      // We create a new game.
      const player = new Player(new MockSocket());
      const data = { path: '/create' };
      handleGameSocket(player.get('id'), data);
      // Game is the one of allGames
      const games = Game.allGames;
      const game = games.find(g => g.get('masterId') === player.get('id'));
      // gameMaster must be player.
      expect(game).toBeTruthy();
    });

    it('should test the /create path with settings', () => {
      const player = new Player(new MockSocket());
      const data = { path: '/create', settings: {} };
      handleGameSocket(player.get('id'), data);
      // Game is the one of allGames
      const games = Game.allGames;
      const game = games.find(g => g.get('masterId') === player.get('id'));
      // gameMaster must be player.
      expect(game).toBeTruthy();
    });
  });


  describe('manipulate game', () => {
    // We create a game
    const player = new Player(new MockSocket());
    const player2 = new Player(new MockSocket());
    const player3 = new Player(new MockSocket());
    const game = new Game(player.get('id'), { maxPlayers: 2 });

    it('should test the /join path', () => {
      // A new player wants to join game.
      const data = { path: '/join', gameId: game.get('id') };
      handleGameSocket(player2.get('id'), data);

      // We must have 2 players in game.
      expect(game.get('players').length).toBe(2);
      expect(game.get('players')[1].get('id')).toBe(player2.get('id'));
    });

    it('should test the /join path but fail because game is full', () => {
      // A new player wants to join game.
      const data = { path: '/join', gameId: game.get('id') };
      try {
        handleGameSocket(player3.get('id'), data);
      } catch (e) {
        // We mut fail to add player.
        expect(e).toBeInstanceOf(SocketException);
        // We must have 2 players in game.
        expect(game.get('players').length).toBe(2);
        expect(game.get('players')[1].get('id')).toBe(player2.get('id'));
      }
    });

    it('should test the /update path with maxPlayers = 3', () => {
      const data = { path: '/update', gameId: game.get('id'), settings: { maxPlayers: 3 } };
      handleGameSocket(player.get('id'), data);
      // maxPlayer should be 3.
      expect(game.get('maxPlayers')).toBe(3);
      // Players must not have changed
      expect(game.get('players').length).toBe(2);
    });

    it('should test the /line path', () => {
      const data = { path: '/line' };
      handleGameSocket(player.get('id'), data);
      // Player score must be updated.
      expect(player.get('score')).toBe(10);
    });

    it('should test the /start path but fail because player is not master', () => {
      const data = { path: '/start', gameId: game.get('id') };
      player.update({ isReady: true });
      player2.update({ isReady: true });
      handleGameSocket(player3.get('id'), data);
      // hasStarted must not be updated.
      expect(game.get('hasStarted')).toBe(false);
    });

    it('should test the /start path and succeed', () => {
      const data = { path: '/start', gameId: game.get('id') };
      handleGameSocket(player.get('id'), data);
      // hasStarted must be updated.
      expect(game.get('hasStarted')).toBe(true);
    });

    it('should test the /end path', () => {
      // Cannot be tested at that point.
    });
  });
});
