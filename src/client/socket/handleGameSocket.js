import store from '../store';
import actions from '../actions';

import { addRTCConn, getPeer } from '../helpers/webRTC';

const { updateGame } = actions;


function update(data) {
  const { game } = data;
  store.dispatch(updateGame(game));
}

export default function (data) {
  const { path } = data;
  console.log(`socket /game${path}`);
  switch (path) {
    case '/update': {
      update(data);
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
