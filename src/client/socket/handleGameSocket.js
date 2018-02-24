import store from '../store';
import actions from '../actions';
import { addRTCConn, getPeer } from '../helpers/webRTC';

const { updateGame, addPieceToQueue, addRow, setNewPiece, endGame, } = actions;


/**
 * Dispatch action that will update game in redux-tree.
 */
function _update(data) {
  const { game } = data;
  store.dispatch(updateGame(game));
}

/**
 * Dispatch action that will row to grid.
 */
function _addRow() {
  store.dispatch(addRow());
}

/**
 * Dispatch action that will add piece to PieceQueue.
 */
function _receivePiece(data) {
  const { newPiece } = data;
  if (!newPiece) throw new Error('client/piecesListener: missing newPiece');
  store.dispatch(addPieceToQueue(data.newPiece));
}

function _start(data) {
  const { game } = data;
  store.dispatch(updateGame(game));
  store.dispatch(setNewPiece());
}

function _end(hasWon) {
  store.dispatch(endGame(hasWon));
}

export default function (data) {
  const { path } = data;
  console.log(`socket /game${path}`);
  switch (path) {
    case '/update': {
      _update(data);
      break;
    }
    case '/newPiece': {
      _receivePiece(data);
      break;
    }
    case '/addRow': {
      _addRow();
      break;
    }
    case '/start': {
      _start(data);
      break;
    }
    case '/end': {
      _end(data.hasWon);
      break;
    }
    case '/join': {
      data.game.players.forEach((player) => {
        const conn = getPeer().connect(player.webRTCId);
        conn.on('open', () => {
          addRTCConn(conn);
        });
      });
      break;
    }
    default: {
      console.log('default triggered');
    }
  }
}
