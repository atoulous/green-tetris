import { RTCConnection } from '../actions/connexion';

export default peer => ({ dispatch, getState }) => {
  if (peer) {
    console.log('peer listener --', peer);
    peer.on('open', (id) => {
      console.log(`My peer ID is: ${id}`, getState());
      const { socket } = getState();
      socket.emit('/game', { path: '/join', id, room: window.location.hash.slice(1), socket: socket.id });
    });

    peer.on('connection', (conn) => {
      dispatch(RTCConnection(conn));
    });
  }
  return next => action => next(action);
};
