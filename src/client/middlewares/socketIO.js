import { RTCConnection } from '../actions/connexion';

export default socket => ({ dispatch, getState }) => {
  if (socket) {
    socket.on('action', dispatch);
    socket.on('/game', (data) => {
      const { path } = data;
      const state = getState();
      switch (path) {
        case '/join': {
          console.log('peer received --', data);
          if (data.id !== state.peer.id) {
            const conn = state.peer.connect(data.id);
            conn.on('open', () => {
              dispatch(RTCConnection(conn));
            });
          }
          break;
        }
        default:
          break;
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
