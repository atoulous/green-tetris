import Piece from '../classes/Piece';

import { getConnection } from './socketManager';

const io = getConnection();

/**
 * handle piece socket input
 *
 * @param {Object} data - the data
 * @return {void}
 */
export default async function (data) {
  const { path } = data;

  switch (path) {
    case '/new': {
      console.log('new piece nedded', data);

      const { room } = data;
      const newPiece = new Piece();

      io.to(room).emit(newPiece);
      break;
    }
    default:
      console.log('default triggered');
  }
}
