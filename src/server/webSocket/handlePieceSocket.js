import Piece from '../classes/Piece';

import logger from '../helpers/logger';
import Game from '../classes/Game';

const newPiece = (gameId) => {
  const currentGame = Game.allGames.find(game => (game.get('id') === gameId));
  if (currentGame) {
    const randomPiece = new Piece();
    currentGame.broadcast('/newPiece', { newPiece: randomPiece.format() });
  }
};

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
        if (!data.gameId) throw new Error('missing gameId param');
        newPiece(data.gameId);
        break;
      }
      default:
        console.log('default triggered');
    }
  } catch (err) {
    logger.error('handlePieceSocket', err);
  }
};
