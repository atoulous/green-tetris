import { RTCConnection } from '../actions/connexion';
import { addRTCConn } from '../helpers/webRTC';

export default peer => ({ dispatch, getState }) => {
  if (peer) {
    peer.on('open', (id) => {
      console.log(`My peer ID is: ${id}`, getState());
      const { socket } = getState();
      socket.emit('/game', { path: '/join', id, room: window.location.hash.slice(1), socket: socket.id });
    });

    peer.on('connection', (conn) => {
      addRTCConn(conn);
    });
  }
  return next => action => next(action);
};
