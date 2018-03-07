import logger from '../helpers/logger';

/**
 * Handle Socket-triggered errors.
 */
export function handleSocketException(socketException) {
  logger.error(socketException.message);
  socketException.respond();
}

export default handleSocketException;
