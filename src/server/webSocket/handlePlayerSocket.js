import _ from 'lodash';

import Game from '../classes/Game';
import Player from '../classes/Player';
import logger from '../helpers/logger';


/*
** Update Player Settings
*/
function update(playerId, settings) {
  const player = Player.getPlayerById(playerId);
  player.update(settings);
  console.log(Player.allPlayers);
}
/*
** Delete Player.
*/
function _delete(playerId) {
  const player = Player.getPlayerById(playerId);
  if (!player) throw new Error('Player not found');
  // If player is in game. Remove player from game.
  if (player.get('gameId')) {
    const game = Game.getGameByid(player.get('gameId'));
    if (!game) throw new Error('Game not found');
    game.removePlayer(playerId);
  }
  // Remove player from players list.
  _.remove(Player.allPlayers, p => p.get('id') === playerId);
}

/**
 * handle player socket input
 *
 * @param {Object} data - the data
 * @return {void}
 */
export default async function (playerId, data) {
  const { path } = data;
  logger.info(`Socket - /player${path}`);
  switch (path) {
    case '/update': {
      update(playerId, data.settings);
      break;
    }
    case '/deconnexion': {
      _delete(playerId);
      break;
    }
    default:
      logger.info('All Players', Player.allPlayers);
  }
}
