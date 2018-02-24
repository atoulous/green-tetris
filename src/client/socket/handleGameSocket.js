import store from '../store';
import actions from '../actions';

import { addRTCConn, getPeer } from '../helpers/webRTC';

const { updateGame, updateError } = actions;


/**
 * Dispatch action that will update game in redux-tree.
 */
function _update(data) {
  const { game } = data;
  store.dispatch(updateGame(game));
}

/**
 * Dispatch action that will update error in redux-tree.
 */
function _error(data) {
  const { error } = data;
  store.dispatch(updateError(error));
}

export default function (data) {
  const { path } = data;
  console.log(`socket /game${path}`);
  switch (path) {
    case '/update': {
      _update(data);
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
