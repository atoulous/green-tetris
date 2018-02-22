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
  constructor(socket) {
    super({
      socket,
      id: socket.id,
      webRTCId: 'default',
      nickname: 'default',
      isReady: false,
      hasLost: false,
      spectrum: [],
      gameId: null,
    });
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
      console.log(this.get('gameId'));
      const game = Game.getGameByid(this.get('gameId'));
      if (game) game.broadcast('/update', { game: game.format() });
    }
  }

  format(props = ['id', 'nickname', 'isReady', 'hasLost', 'spectrum', 'gameId', 'webRTCId']) {
    return super.format(props);
  }
}

export default Player;
