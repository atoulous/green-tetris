import logger from '../helpers/logger';

/**
 * Handle Socket-triggered errors.
 */
export default function (socketException) {
  logger.error(socketException.message);
  socketException.respond();
}
