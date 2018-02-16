import uniqid from 'uniqid';

import Player from '../classes/Player';
import Game from '../classes/Game';
import { getConnection } from './socketManager';
import { getGames, addGame, getGame } from '../helpers/game';

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

      addGame(new Game({ room: hash, gameMaster: new Player({ webRTCId, socketId }) }));
      console.log(' games are -- ', getGames());
      break;
    }
    case '/join': {
      console.log('new peer joined the game', data);

      const { room, webRTCId, socketId } = data;
      const currrentGame = getGame(room);
      if (currrentGame) {
        const newPlayer = new Player({ socketId, webRTCId });
        currrentGame.players.push(newPlayer);
        currrentGame.broadcast(
          getConnection(), '/game',
          { path: '/join', webRTCId: newPlayer.webRTCId, nickname: newPlayer.nickname }
        );
      }
      break;
    }
    default:
      console.log('default triggered');
      break;
  }
}
