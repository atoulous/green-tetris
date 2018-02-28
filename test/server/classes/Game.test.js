import MockSocket from './MockSocket';

import Game from '../../../src/server/classes/Game';
import Player from '../../../src/server/classes/Player';
import Piece from '../../../src/server/classes/Piece';
import SocketException from '../../../src/server/classes/SocketException';

describe('classes/game', () => {
  it('should success to create game instance', async () => {
    const masterPlayer = new Player(new MockSocket());
    const game = new Game(masterPlayer.get('id'), {});


    expect(game).not.toBeUndefined();
    // id is a valid string.
    expect(typeof game.get('id')).toBe('string');
    // size is a valid object with label and value properties.
    expect(typeof game.get('size')).toBe('object');
    // speed is a valid object with label and value properties.
    expect(typeof game.get('speed')).toBe('object');
    // maxPlayers is a valid number.
    expect(game.get('maxPlayers')).toBe(5);
    // players is a valid array with one Player inside.
    expect(game.get('players')).toEqual(expect.arrayContaining([masterPlayer]));
    // pieceQueue is a valid array with one Piece inside.
    expect(game.get('piecesQueue')[0]).toEqual(expect.any(Piece));
  });

  it('should create a game with maxPlayers = 3 and add 2 players', async () => {
    const masterPlayer = new Player(new MockSocket());
    const game = new Game(masterPlayer.get('id'), { maxPlayers: 3 });
    const player2 = new Player(new MockSocket());
    const player3 = new Player(new MockSocket());
    game.addPlayer(player2.get('id'));
    game.addPlayer(player3.get('id'));

    expect(game.get('maxPlayers')).toBe(3);
    expect(game.get('players')).toEqual(expect.arrayContaining([expect.any(Player), expect.any(Player), expect.any(Player)]));
    expect(game.get('players').length).toBe(3);
  });

  it('should create a game with maxPlayers = 2 and add 1 players and start it', async () => {
    const masterPlayer = new Player(new MockSocket());
    const game = new Game(masterPlayer.get('id'), { maxPlayers: 2 });
    const player2 = new Player(new MockSocket());
    game.addPlayer(player2.get('id'));
    masterPlayer.update({ isReady: true });
    player2.update({ isReady: true });
    game.start();

    expect(game.get('maxPlayers')).toBe(2);
    expect(game.get('players')).toEqual(expect.arrayContaining([expect.any(Player), expect.any(Player)]));
    expect(game.get('players').length).toBe(2);
    expect(game.get('hasStarted')).toBe(true);
  });

  it('should create a game with maxPlayers = 2 and add 1 players and fail start it', async () => {
    const masterPlayer = new Player(new MockSocket());
    const game = new Game(masterPlayer.get('id'), { maxPlayers: 2 });
    const player2 = new Player(new MockSocket());
    game.addPlayer(player2.get('id'));
    masterPlayer.update({ isReady: true });
    try {
      game.start();
    } catch (e) {
      expect(e).toBeInstanceOf(SocketException);
    }
    expect(game.get('maxPlayers')).toBe(2);
    expect(game.get('players')).toEqual(expect.arrayContaining([expect.any(Player), expect.any(Player)]));
    expect(game.get('players').length).toBe(2);
    expect(game.get('hasStarted')).toBe(false);
  });

  it('should remove 1 player in game of 2', async () => {
    const masterPlayer = new Player(new MockSocket());
    const masterPlayerId = masterPlayer.get('id');
    const game = new Game(masterPlayer.get('id'), { maxPlayers: 2 });
    const player2 = new Player(new MockSocket());
    game.addPlayer(player2.get('id'));

    // Remove player2.
    game.removePlayer(player2.get('id'));

    expect(game.get('players')).toEqual(expect.arrayContaining([expect.any(Player)]));
    expect(game.get('players').length).toBe(1);
    expect(game.get('players')[0].get('id')).toBe(masterPlayerId);
  });

  it('should remove masterPlayer in game of 2 and switch masterPlayer', async () => {
    const masterPlayer = new Player(new MockSocket());
    const game = new Game(masterPlayer.get('id'), { maxPlayers: 2 });
    const player2 = new Player(new MockSocket());
    const player2Id = player2.get('id');
    const masterPlayerId = masterPlayer.get('id');
    game.addPlayer(player2.get('id'));

    // Remove Master.
    game.removePlayer(masterPlayer.get('id'));

    expect(game.get('players')).toEqual(expect.arrayContaining([expect.any(Player)]));
    expect(game.get('players').length).toBe(1);
    expect(game.get('players')[0].get('id')).toBe(player2Id);
    expect(game.isMaster(player2Id)).toBe(true);
    expect(game.isMaster(masterPlayerId)).toBe(false);
  });

  it('should remove 2 player in game of 2 and destroy game', async () => {
    const masterPlayer = new Player(new MockSocket());
    const game = new Game(masterPlayer.get('id'), { maxPlayers: 2 });
    const gameId = game.get('id');
    const player2 = new Player(new MockSocket());
    game.addPlayer(player2.get('id'));


    // Remove 2 players.
    game.removePlayer(masterPlayer.get('id'));
    game.removePlayer(player2.get('id'));

    const isInAllGames = Game.allGames.find(g => g.get('id') === gameId);
    expect(isInAllGames).toBeUndefined();
  });

  it('should fail to remove player not in game', async () => {
    const masterPlayer = new Player(new MockSocket());
    const player2 = new Player(new MockSocket());
    const game = new Game(masterPlayer.get('id'), { maxPlayers: 2 });
    try {
      game.removePlayer(player2.get('id'));
    } catch (e) {
      expect(e).toBeInstanceOf(SocketException);
    }
  });


  it('should fail to add player already in game', async () => {
    const masterPlayer = new Player(new MockSocket());
    const game = new Game(masterPlayer.get('id'), { maxPlayers: 2 });
    try {
      game.addPlayer(masterPlayer.get('id'));
    } catch (e) {
      expect(e).toBeInstanceOf(SocketException);
    }
  });

  it('should get master and fail to get player', async () => {
    const masterPlayer = new Player(new MockSocket());
    const player2 = new Player(new MockSocket());
    const game = new Game(masterPlayer.get('id'), { maxPlayers: 2 });

    expect(game.getPlayer(player2.get('id'))).toBeNull();
    expect(game.getPlayer(masterPlayer.get('id'))).toEqual(masterPlayer);
  });

  it('should update game size and speed', async () => {
    const masterPlayer = new Player(new MockSocket());
    const game = new Game(masterPlayer.get('id'), { maxPlayers: 2 });

    game.update({ size: { label: 'Test', value: 100 }, speed: { label: 'Test', value: 100 } });

    expect(game.get('size.label')).toBe('Test');
    expect(game.get('speed.label')).toBe('Test');
    expect(game.get('size.value')).toBe(100);
    expect(game.get('speed.value')).toBe(100);
  });

  it('should update game maxPlayers and kick 2 players', async () => {
    const masterPlayer = new Player(new MockSocket());
    const player2 = new Player(new MockSocket());
    const player3 = new Player(new MockSocket());
    const player2Id = player2.get('id');
    const player3Id = player3.get('id');
    const game = new Game(masterPlayer.get('id'), { maxPlayers: 3 });
    game.addPlayer(player2Id);
    game.addPlayer(player3Id);

    // Upate maxPlayer from 3 to 1. It should disconnect surplus players.
    game.update({ maxPlayers: 1 });

    // Players are not found in game.
    expect(game.getPlayer(player2Id)).toBeNull();
    expect(game.getPlayer(player3Id)).toBeNull();
    // Players are not found in static allGames.
    expect(Player.getPlayerById(player2Id)).toBe(null);
    expect(Player.getPlayerById(player3Id)).toBe(null);

    // Player maxPlayers has switched to 1.
    expect(game.get('maxPlayers')).toBe(1);
    expect(game.get('players').length).toBe(1);

    // Remaining player must be master Player
    expect(game.get('players[0]')).toEqual(masterPlayer);
  });
});
