import _ from 'lodash';

import { getUUID } from '../helpers/utils';
import Payload from './Payload';
import Player from './Player';


const _allGames = [];


/**
 * Class Game
 *
 * @param constructor {String} - masterId
 */
class Game extends Payload {
  constructor(masterId) {
    const master = Player.getPlayerById(masterId);
    if (!master) throw new Error('Master not found');
    super({
      id: getUUID(),
      masterId: master.get('id'),
      speed: 'normal',
      size: 'normal',
      maxPlayers: 5,
      players: [],
      hasStarted: false,
      hasFinished: false,
      pieceQueue: [],
    });
    this.addPlayer(masterId);
  }

  static get allGames() {
    return _allGames;
  }

  static getGameByid(id) {
    const result = _allGames.filter(game => game.get('id') === id);
    return (result.length > 0) ? result[0] : null;
  }

  broadcast(subject, data) {
    data.path = subject;
    this.payload.players.forEach((player) => {
      const socket = player.get('socket');
      socket.emit('/game', data);
    });
  }

  start() {
    this.set('hasStarted', true);
    this.broadcast('/update', { game: this.format() });
  }

  addPlayer(playerId) {
    const player = Player.getPlayerById(playerId);
    if (!player) throw new Error('Player not found');
    if (this.getPlayer(playerId)) throw new Error('Player already in game');
    this.payload.players.push(player);
    player.update({ gameId: this.get('id') });
    this.broadcast('/update', { game: this.format() });
  }

  removePlayer(playerId) {
    const player = Player.getPlayerById(playerId);
    if (!player) throw new Error('Player not found');
    if (!this.getPlayer(playerId)) throw new Error('Player not in game');
    this.payload.players = _.remove(this.payload.players, p => p.get('id') === playerId);
    this.broadcast('/update', { game: this.format() });
  }

  getPlayer(playerId) {
    const result = this.get('players').filter(player => player.get('id') === playerId);
    return (result.length > 0) ? result[0] : null;
  }

  format(props = ['id', 'masterId', 'speed', 'size', 'maxPlayers', 'hasStarted', 'hasFinished', 'pieceQueue']) {
    let players = this.get('players');
    players = players.map(p => p.format());
    return _.merge(super.format(props), { players });
  }

  isMaster(playerId) {
    return playerId === this.get('masterId');
  }

  update(settings) {
    _.merge(this.payload, settings);
  }
}

export default Game;
