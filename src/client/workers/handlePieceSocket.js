import { getClient } from '../helpers/webSocket';
import logger from '../../server/helpers/logger';
import store from '../store';

let client = null;
let started = false;

/**
 * start the piece events listener
 */
export function start() {
  if (started) throw new Error('Already running worker');
  started = true;

  client = getClient();

  client.on('/piece', (data) => {
    if (!data || !data.path) throw new Error('handlePieceSocket/piece: missing params');

    switch (data.path) {
      case '/new':
        console.log('should addNewPieceToQueue', data.newPiece);
        // store.dispatch(addNewPieceToQueue(data.newPiece));
        break;
      default:
        logger.info('handlePieceSocket/piece: default case');
    }
  });

  // Set token auth ?
}

/**
 * stop the piece events listener
 */
export function stop() {
  if (client) {
    client.disconnect();
    client = null;
  }
  started = false;
}

