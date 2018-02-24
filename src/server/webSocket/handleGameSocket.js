import _ from 'lodash';

import logger from '../helpers/logger';
import Game from '../classes/Game';
import Player from '../classes/Player';
import handleSocketException from './handleSocketException';
import SocketException from '../classes/SocketException';

// import { getConnection } from './socketManager';
// import { getGames, addGame, getGame } from '../helpers/game';


/**
 * Create a new game with player as gameMaster.
 */
function create(playerId, settings) {
  settings = settings || {};
  const { allGames } = Game;
  allGames.push(new Game(playerId, settings));
}
/**
 * Join an existing game. If fail to find game, disconnect.
 */
function join(playerId, gameId) {
  // Check that game exists.
  const game = Game.getGameByid(gameId);
  if (!game) throw new SocketException('Game not found', true);

  // Check that game is not full.
  if (game.get('maxPlayers') === game.get('players').length) {
    // Check that player exists.
    const player = Player.getPlayerById(playerId);
    if (!player) throw new SocketException('Player not found');
    // Disconnect player.
    player.get('socket').disconnect(true);
  } else {
    // Add player.
    game.addPlayer(playerId);
  }
}
/**
 * Update an existing game. If fail to find game, disconnect.
 */
function update(playerId, gameId, settings) {
  // Check that game exists.
  const game = Game.getGameByid(gameId);
  if (!game) throw new SocketException('Game not found', true);
  // Check that player is allowed to update settings.
  if (game.isMaster(playerId)) game.update(settings);
}

function line(playerId) {
  // Check that player exists.
  const player = Player.getPlayerById(playerId);
  if (!player) throw new SocketException('Player not found', true);
  // Check that game exists.
  const game = Game.getGameByid(player.get('gameId'));
  if (!game) throw new SocketException('Game not found', true);
  // Broadcast event addRow to all player but self.
  game.broadcast('/addRow', {}, [playerId]);
}

/**
 * handle game socket input
 *
 * @param {Object} data - the data
 * @return {void}
 */
export default async function (playerId, data) {
  try {
    const { path } = data;
    logger.info(`Socket - /game${path}`);
    switch (path) {
      case '/create': {
        // const { webRTCId, socketId } = data;
        create(playerId, data.settings);
        break;
      }
      case '/join': {
        join(playerId, data.gameId);
        break;
      }
      case '/update': {
        update(playerId, data.gameId, data.settings);
        break;
      }
      case '/line': {
        line(playerId);
        break;
      }
      default:
        break;
    }
    logger.info('All Games', Game.allGames);
  } catch (e) {
    if (e instanceof SocketException) {
      e.socketId = playerId;
      handleSocketException(e);
    } else throw e;
  }
}


// case '/join': {
//   const { room, webRTCId, socketId } = data;
//   const currrentGame = getGame(room);
//   if (currrentGame && !currrentGame.hasStarted) {
//     const newPlayer = new Player({ socketId, webRTCId });
//     getConnection().to(socketId).emit('/game', { path: '/joined', game: currrentGame });
//     currrentGame.players.push(newPlayer);
//     currrentGame.broadcast(getConnection(), '/game', { path: '/updated', game: currrentGame });
//   } else {
//     console.log('NOTHING SHOULD HAPPEN AS EITHER GAME DOES NOT EXIST OR GAME HAS STARTED');
//   }
//   break;
// }
