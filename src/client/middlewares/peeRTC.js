import { params } from '../constants';

export default const peerRTCMiddleware = (peer) => ({ dispatch, getState }) => {

  peer.on('open', (id) => {
    console.log('My peer ID is: ' + id, getState());
    getState().connexion.socket.emit('peer', {id, room: params.server.url});
  });

  if (peer) {
    peer.on('connection', (conn) => {
      dispatch(RTCConnectionAction(conn));
    })
  }
  return next => action => {
    return next(action);
  }
};