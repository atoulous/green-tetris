import _ from 'lodash';

import { getUUID } from '../helpers/utils';
import Payload from './Payload';
import Player from './Player';
import SocketException from './SocketException';
import Piece from './Piece';

const _allGames = [];

/**
 * Class Game
 * @param constructor {String} - masterId
 *
 */
class Game extends Payload {
  constructor(masterId, settings) {
    // Check that master player exists.
    const master = Player.getPlayerById(masterId);
    if (!master) throw new SocketException('Master not found');

    super({
      id: getUUID(),
      masterId: master.get('id'),
      speed: { label: 'Normal', value: 1000 },
      size: { label: 'Normal', value: 20 },
      maxPlayers: 5,
      players: [],
      hasStarted: false,
      piecesQueue: [new Piece()],
      ...settings
    });
    this.addPlayer(masterId);
    Game.allGames.push(this);
  }

  static get allGames() {
    return _allGames;
  }

  static getGameByid(id) {
    return _allGames.find(game => game.get('id') === id);
  }

  broadcast(subject, data = {}, idsToOmit = []) {
    this.payload.players.forEach((player) => {
      // Don't emit to specific ids.
      if (!idsToOmit.includes(player.get('id'))) {
        const socket = player.get('socket');
        socket.emit('/game', { ...data, path: subject });
      }
    });
  }

  start() {
    // Check that all players are ready
    const players = this.get('players');
    if (players.every(p => p.get('isReady') === true)) {
      this.set('hasStarted', true);
      this.broadcast('/start', { game: this.format() });
    } else {
      throw new SocketException('All players are not ready');
    }
  }

  addPlayer(playerId) {
    // Check that player exists.
    const player = Player.getPlayerById(playerId);
    if (!player) throw new SocketException('Player not found');

    // Check that player is not already in game.
    if (this.getPlayer(playerId)) throw new SocketException('Player already in game');

    // Update player.
    player.update({ gameId: this.get('id') });

    // Send a join alert for RTC init in front.
    player.get('socket').emit('/game', { path: '/join', game: this.format() });

    // Update game.
    this.payload.players.push(player);

    // Update all players in game.
    this.broadcast('/update', { game: this.format() });
  }

  removePlayer(playerId) {
    // Check that player is in game.
    if (!this.getPlayer(playerId)) { throw new SocketException('Player not in game', true); }

    // Remove player from game player list.
    _.remove(this.payload.players, p => p.get('id') === playerId);

    // Game is now empty. Delete it.
    if (this.payload.players.length === 0) {
      _.remove(Game.allGames, g => g.get('id') === this.get('id'));
    } else {
      // Game not empty and masterPlayer quit. change masterPlayerId.
      if (this.get('masterId') === playerId) {
        const players = this.get('players');
        this.set('masterId', players[0].get('id'));
      }
      // Update all players in game.
      this.broadcast('/update', { game: this.format() });
    }
  }

  getPlayer(playerId) {
    const result = this.get('players').filter(player => player.get('id') === playerId);
    return (result.length > 0) ? result[0] : null;
  }

  format(props = ['id', 'masterId', 'speed', 'size', 'maxPlayers', 'hasStarted', 'isSolo']) {
    // Format Pieces.
    let piecesQueue = this.get('piecesQueue');
    piecesQueue = piecesQueue.map(p => p.format());
    // Format Players.
    let players = this.get('players');
    players = players.map(p => p.format());
    return _.merge(super.format(props), { players, piecesQueue });
  }

  isMaster(playerId) {
    return playerId === this.get('masterId');
  }

  update(settings = {}) {
    // If maxPlayer is set, we might have to kick players.
    const players = this.get('players');
    const playersNumber = players.length;
    if (settings.maxPlayers && settings.maxPlayers < playersNumber) {
      if (settings.maxPlayers === 0) settings.maxPlayers = 1;
      const i = settings.maxPlayers;
      let j = settings.maxPlayers;
      for (j; j < playersNumber; j++) {
        const p = players[i];
        p.get('socket').disconnect(true);
      }
    }
    // Merge settings.
    _.merge(this.payload, settings);
    // Update all players in game.
    this.broadcast('/update', { game: this.format() });
  }
}

export default Game;
