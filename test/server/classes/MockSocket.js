import remove from 'lodash/remove';
import uuid from 'uuid/v1';

import Player from '../../../src/server/classes/Player';
import Game from '../../../src/server/classes/Game';


export default class MockSocket {
  constructor() {
    this.id = uuid();
    this.emit = (type) => {
      // console.log(`Socket emitted. Type: ${type}`);
    };

    this.disconnect = () => {
      const player = Player.getPlayerById(this.id);
      // If player is in game. Remove player from game.
      if (player.get('gameId')) {
        const game = Game.getGameByid(player.get('gameId'));
        if (game) game.removePlayer(this.id);
      }
      // Remove player from players list.
      remove(Player.allPlayers, p => p.get('id') === this.id);
    };
  }
}
