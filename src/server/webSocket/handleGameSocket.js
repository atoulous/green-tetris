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
      console.log('game --- ', getGames()[0]);
      const currrentGame = getGame(room);
      console.log('cur game --- ', currrentGame);
      if (currrentGame && !currrentGame.hasStarted) {
        const newPlayer = new Player({ socketId, webRTCId });
        /*
        currrentGame.broadcast(
          getConnection(), '/game',
          { path: '/join', webRTCId: newPlayer.webRTCId, nickname: newPlayer.nickname }
        );
        getConnection().to(socketId).emit('/player',
        { path: '/list', players: currrentGame.players.map(
          pl => (pl.formatData(['nickname', 'socketId', 'webRTCId']))) });
        */
        getConnection().to(socketId).emit('/game', { path: '/joined', game: currrentGame });
        currrentGame.players.push(newPlayer);
        currrentGame.broadcast(getConnection(), '/game', { path: '/updated', game: currrentGame });
      } else {
        console.log('NOTHING SHOULD HAPPEN AS EITHER GAME DOES NOT EXIST OR GAME HAS STARTED');
      }
      break;
    }
    default:
      console.log('default triggered');
      break;
  }
}
