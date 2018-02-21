import _ from 'lodash';

import logger from '../helpers/logger';
import Game from '../classes/Game';

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
  // if (!game) throw new Error('Game not found');
  game.addPlayer(playerId);
}
/**
 * Leave an existing game.
 */
function leave(playerId) {
  const game = Game.getGameByid(gameId);
  // if (!game) throw new Error('Game not found');
  game.removePlayer(playerId);
}
/**
 * Update an existing game.
 */
function update(playerId, gameId, settings) {
  const game = Game.getGameByid(gameId);
  // if (!game) throw new Error('Game not found');
  // if (!game.isMaster(playerId)) throw new Error('Player not allowed to update settings');
  game.update(settings);
}

/**
 * handle game socket input
 *
 * @param {Object} data - the data
 * @return {void}
 */
export default async function (playerId, data) {
  const { path } = data;
  logger.info(`Socket - /game${path}`);
  switch (path) {
    case '/create': {
      // const { webRTCId, socketId } = data;
      create(playerId);
      break;
    }
    case '/join': {
      if (!data.gameId) throw new Error('No GameId to join.');
      join(playerId, data.gameId);
      break;
    }
    case '/leave': {
      if (!data.gameId) throw new Error('No GameId to leave.');
      leave(playerId, data.gameId);
      break;
    }
    case '/update': {
      if (!data.settings) throw new Error('No settings to update.');
      if (!data.gameId) throw new Error('No GameId to update');
      update(playerId, data.gameId, data.settings);
      break;
    }
    case '/deconnexion': {
      leave(playerId);
      break;
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
    default:
      break;
  }
  logger.info('All Games', Game.allGames);
}
