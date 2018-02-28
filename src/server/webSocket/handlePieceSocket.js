import logger from '../helpers/logger';
import Game from '../classes/Game';
import SocketException from '../classes/SocketException';
import handleSocketException from './handleSocketException';


const newPiece = (gameId) => {
  const game = Game.allGames.find(g => (g.get('id') === gameId));
  if (!game) throw new SocketException('Game not found.');
  game.sendPiece();
};

/**
 * handle piece socket input
 *
 * @param {Object} data - the data: expect path and room
 * @return {void}
 */
export default async (playerId, data) => {
  try {
    if (!data || !data.path) throw new SocketException('Missing data or path');
    const { path } = data;
    logger.info(`Socket - /piece${path}`);
    switch (path) {
      case '/new': {
        newPiece(data.gameId);
        break;
      }
      default:
        console.log('default triggered');
        break;
    }
  } catch (e) {
    if (e instanceof SocketException) {
      e.socketId = playerId;
      handleSocketException(e);
    } else throw e;
  }
};
