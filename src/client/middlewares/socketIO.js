import { RTCConnection } from '../actions/connexion';

export default socket => ({ dispatch, getState }) => {
  if (socket) {
    socket.on('action', dispatch);
    socket.on('peer', (newPeer) => {
      if (newPeer.id !== getState().peer.id) {
        const conn = getState().peer.connect(newPeer.id);
        conn.on('open', () => {
          dispatch(RTCConnection(conn));
        });
      }
    });
  }
  return next => (action) => {
    if (socket && action.type && action.type.indexOf('server/') === 0) {
      socket.emit('action', action);
    }
    return next(action);
  };
};
