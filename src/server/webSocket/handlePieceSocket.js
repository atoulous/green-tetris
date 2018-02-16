import Piece from '../classes/Piece';

import logger from '../helpers/logger';
import { getConnection } from './socketManager';
import { getGames } from '../helpers/game';

const io = getConnection();

/**
 * handle piece socket input
 *
 * @param {Object} data - the data: expect path and room
 * @return {void}
 */
export default async function (data) {
  try {
    if (!data || !data.path) throw new Error('missing params');

    switch (data.path) {
      case '/new': {
        console.log('new piece needed', data);

        if (!data.room) throw new Error('missing room param');

        const currentGame = getGames().find(game => (game.room === data.room));
        if (currentGame) {
          const newPiece = new Piece();
          currentGame.broadcast(io, '/piece', { path: '/new', newPiece });
        }
        break;
      }
      default:
        console.log('default triggered');
    }
  } catch (err) {
    logger.error('handlePieceSocket', err);
  }
}
