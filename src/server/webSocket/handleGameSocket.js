import _ from 'lodash';

import logger from '../helpers/logger';
import Game from '../classes/Game';
import Player from '../classes/Player';
import handleSocketError from './handleErrorSocket';
import { SocketErrorGame, SocketErrorPlayer } from '../classes/SocketError';

// import { getConnection } from './socketManager';
// import { getGames, addGame, getGame } from '../helpers/game';


/**
 * Create a new game with player as gameMaster.
 */
function create(playerId) {
  const { allGames } = Game;
  allGames.push(new Game(playerId));
}
/**
 * Join an existing game.
 */
function join(playerId, gameId) {
  const game = Game.getGameByid(gameId);
  if (!game) throw new SocketErrorGame('Game not found');
  // If game is full, player is disconnected.
  if (game.get('maxPlayers') === game.get('players').length) {
    const player = Player.getPlayerById(playerId);
    if (!player) throw new SocketErrorGame('Player not found');
    player.get('socket').disconnect(true);
  } else {
    game.addPlayer(playerId);
  }
}
/**
 * Update an existing game.
 */
function update(playerId, gameId, settings) {
  const game = Game.getGameByid(gameId);
  if (!game) throw new SocketErrorGame('Game not found');
  if (!game.isMaster(playerId)) throw new SocketErrorGame('Player not allowed to update settings');
  game.update(settings);
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
        throw new SocketErrorGame('Merde');
        create(playerId);
        break;
      }
      case '/join': {
        if (!data.gameId) throw new SocketErrorGame('No GameId to join.');
        join(playerId, data.gameId);
        break;
      }
      case '/update': {
        if (!data.settings) throw new SocketErrorGame('No settings to update.');
        if (!data.gameId) throw new SocketErrorGame('No GameId to update');
        update(playerId, data.gameId, data.settings);
        break;
      }
      default:
        break;
    }
    logger.info('All Games', Game.allGames);
  } catch (e) {
    console.log(SocketErrorGame);
    e.broadcast();
    if (e instanceof SocketErrorGame) {
      console.log('spodfispdofi');
      e.socketId = playerId;
      handleSocketError(new SocketErrorGame(e.message, playerId));
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
