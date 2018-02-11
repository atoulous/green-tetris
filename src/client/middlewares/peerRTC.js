import { params } from '../constants';
import { RTCConnection } from '../actions/connexion';

export default peer => ({ dispatch, getState }) => {
  peer.on('open', (id) => {
    console.log(`My peer ID is: ${id}`, getState());
    getState().socket.emit('peer', { id, room: params.server.url });
  });

  if (peer) {
    peer.on('connection', (conn) => {
      dispatch(RTCConnection(conn));
    });
  }
  return next => action => next(action);
};
