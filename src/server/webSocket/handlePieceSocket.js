import Piece from '../classes/Piece';

import logger from '../helpers/logger';
import Game from '../classes/Game';

/**
 * handle piece socket input
 *
 * @param {Object} data - the data: expect path and room
 * @return {void}
 */
export default async (playerId, data) => {
  try {
    if (!data || !data.path) throw new Error('missing params');

    switch (data.path) {
      case '/new': {
        console.log('new piece needed', data, ' games ---  ', Game.allGames);

        if (!data.gameId) throw new Error('missing gameId param');

        const currentGame = Game.allGames.find(game => (game.get('id') === data.gameId));
        console.log('cur gmae -- ', currentGame);
        if (currentGame) {
          const newPiece = new Piece();
          console.log('will broadcast -- ');
          currentGame.broadcast('/newPiece', { newPiece });
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
