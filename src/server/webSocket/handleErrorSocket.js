import logger from '../helpers/logger';

/**
 * Handle Socket-triggered errors.
 */
export default function (socketError) {
  logger.error(socketError.message);
  socketError.broadcast();
}
