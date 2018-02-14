import Player from '../classes/Player';
import Game from '../classes/Game';
import { getConnection } from './socketManager';

const io = getConnection();
const allGames = [new Game({ room: 'oijf9898a' }), new Game({ room: 'ffhreuf8fhf' })];

/**
 * handle game socket input
 *
 * @param {Object} data - the data
 * @return {void}
 */
export default async function (data) {
  const { path } = data;
  switch (path) {
    case '/join': {
      console.log('new peer joined the game', data);

      const { room, id, socket } = data;
      const currrentGame = allGames.find(game => (game.room === room));
      if (currrentGame) {
        currrentGame.broadcast(io, '/game', { path: '/join', id });
        currrentGame.players.push(new Player({ socket, id }));
      }
      break;
    }
    default:
      console.log('default triggered');
      break;
  }
}
