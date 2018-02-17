import { getConnection } from './socketManager';
import { getGame } from '../helpers/game';
import Player from '../classes/Player';

const io = getConnection();

/**
 * handle player socket input
 *
 * @param {Object} data - the data
 * @return {void}
 */
export default async function (data) {
  const { path } = data;

  switch (path) {
    case '/new': {
      console.log('new piece needed', data);

      const { room } = data;
      const { socketId } = io;

      const newPlayer = new Player({ room, socketId });

      io.to(room).emit(newPlayer);
      break;
    }
    case '/nickname': {
      const { nickname, webRTCId, room } = data;
      const game = getGame(room);
      const player = game.players.find(tmpPlayer => (tmpPlayer.webRTCId === webRTCId));
      player.nickname = nickname;
      game.broadcast(getConnection(), '/player', { path: '/nickname', webRTCId, nickname });
      break;
    }
    default:
      console.log('default triggered');
  }
}
