import { getConnection } from './socketManager';
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
    default:
      console.log('default triggered');
  }
}
