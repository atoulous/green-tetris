import { joinGame } from '../actions/socket';
import { addRTCConn } from '../helpers/webRTC';
import * as socketClient from '../helpers/webSocket';


export default peer => ({ dispatch, getState }) => {
  if (peer) {
    peer.on('open', (webRTCId) => {
      console.log(`My peer ID is: ${webRTCId}`, getState());
      const socket = socketClient.getClient();
      console.log('cur socket - ', socket);
      dispatch(joinGame({ webRTCId, room: window.location.hash.slice(1), socketId: socket.id }));
    });

    peer.on('connection', (conn) => {
      addRTCConn(conn);
    });
  }
  return next => action => next(action);
};
