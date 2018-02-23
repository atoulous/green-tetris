import _ from 'lodash';

import Game from '../classes/Game';
import Player from '../classes/Player';
import logger from '../helpers/logger';
import SocketException from '../classes/SocketException';
import handleSocketException from './handleSocketException';


/*
** Update Player Settings
*/
function update(playerId, settings) {
  const player = Player.getPlayerById(playerId);

  // Check that player exist.
  if (!player) throw new SocketException('Player not found');

  player.update(settings);
}
/*
** Delete Player.
*/
function disconnect(playerId) {
  const player = Player.getPlayerById(playerId);

  // Check that player exist.
  if (!player) throw new SocketException('Player not found');

  // If player is in game. Remove player from game.
  if (player.get('gameId')) {
    const game = Game.getGameByid(player.get('gameId'));
    if (game) game.removePlayer(playerId);
  }

  // Remove player from players list.
  _.remove(Player.allPlayers, p => p.get('id') === playerId);
}
/*
** Kick Player.
*/
function kick(playerId, playerIdToDelete) {
  const player = Player.getPlayerById(playerId);
  const playerToDelete = Player.getPlayerById(playerIdToDelete);

  // Check that player and playerToDelete exist.
  if (!player) throw new SocketException('Player not found');
  if (!playerToDelete) throw new SocketException('Player to delete not found');

  // Check that playerId is allowed to kick player as gameMaster.
  const game = Game.getGameByid(player.get('gameId'));
  if (game && game.get('masterId') === playerId) { playerToDelete.get('socket').disconnect(true); }
}

/**
 * handle player socket input
 *
 * @param {Object} data - the data
 * @return {void}
 */
export default async function (playerId, data) {
  try {
    const { path } = data;
    logger.info(`Socket - /player${path}`);
    switch (path) {
      case '/update': {
        update(playerId, data.settings);
        break;
      }
      case '/deconnexion': {
        disconnect(playerId);
        break;
      }
      case '/kick': {
        kick(playerId, data.playerIdToDelete);
        break;
      }
      default: {
        console.log('default triggered');
      }
    }
    logger.info('All Players', Player.allPlayers);
  } catch (e) {
    if (e instanceof SocketException) {
      e.socketId = playerId;
      handleSocketException(e);
    } else throw e;
  }
}

