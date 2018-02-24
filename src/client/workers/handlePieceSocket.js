import { getClient } from '../socket/index';
import logger from '../../server/helpers/logger';
import store from '../store/index';
import { addPieceToQueue } from '../actions/index';

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
    if (!data || !data.path) throw new Error('client/handlePieceSocket/piece: missing params');

    switch (data.path) {
      case '/new':
        if (data.newPiece) {
          console.log('should addPieceToQueue', data.newPiece);
          store.dispatch(addPieceToQueue(data.newPiece));
        }
        break;
      default:
        logger.info('client/handlePieceSocket/piece: default case');
    }
  });
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

export default start();

