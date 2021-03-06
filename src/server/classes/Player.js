import _ from 'lodash';
import Payload from './Payload';
import Game from './Game';

/**
 * Class Player
 *
 * @param constructor {Object} - id, socket
 */


const _allPlayers = [];

class Player extends Payload {
  constructor(socket = null) {
    if (!socket) throw new Error('socker required to construct Player instance');
    super({
      socket,
      id: socket.id,
      webRTCId: 'default',
      nickname: 'default',
      isReady: false,
      hasWon: null,
      score: 0,
      gameId: null,
    });
    Player.allPlayers.push(this);
  }

  static get allPlayers() {
    return _allPlayers;
  }

  static getPlayerById(id) {
    const result = _allPlayers.filter(player => player.get('id') === id);
    return (result.length > 0) ? result[0] : null;
  }

  update(settings) {
    _.merge(this.payload, settings);
    if (this.get('gameId')) {
      const game = Game.getGameByid(this.get('gameId'));
      if (game) game.broadcast('/update', { game: game.format() });
    }
  }

  format(props = ['id', 'nickname', 'isReady', 'hasWon', 'gameId', 'webRTCId', 'score']) {
    return super.format(props);
  }
}

export default Player;
