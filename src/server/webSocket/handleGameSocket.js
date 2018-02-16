import uniqid from 'uniqid';

import Player from '../classes/Player';
import Game from '../classes/Game';
import { getConnection } from './socketManager';
import { getGames, addGame } from '../helpers/game';

const io = getConnection();

/**
 * handle game socket input
 *
 * @param {Object} data - the data
 * @return {void}
 */
export default async function (data) {
  const { path } = data;
  switch (path) {
    case '/create': {
      console.log('new game is created', data);
      const hash = uniqid();
      const { webRTCId, socketId } = data;

      console.log('before game -', getGames());
      addGame(new Game({ room: hash, gameMaster: new Player({ webRTCId, socketId }) }));
      console.log('after game -', getGames());
      break;
    }
    case '/join': {
      console.log('new peer joined the game', data);

      const { room, webRTCId, socketId } = data;
      const currrentGame = getGames().find(game => (game.room === room));
      if (currrentGame) {
        currrentGame.broadcast(io, '/game', { path: '/join', webRTCId });
        currrentGame.players.push(new Player({ socketId, webRTCId }));
      }
      break;
    }
    default:
      console.log('default triggered');
      break;
  }
}
