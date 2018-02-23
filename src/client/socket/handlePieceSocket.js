import store from '../store';
import { addPieceToQueue } from '../actions';
import logger from '../../server/helpers/logger';

export default function (data) {
  if (!data || !data.path) throw new Error('client/piecesListener: missing params');

  switch (data.path) {
    case '/new':
      if (!data.newPiece) throw new Error('client/piecesListener: missing newPiece');

      console.log('should addPieceToQueue', data.newPiece);
      store.dispatch(addPieceToQueue(data.newPiece));
      break;
    default:
      logger.info('client/handlePieceSocket/piece: default case');
  }
}
