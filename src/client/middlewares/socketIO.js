import { RTCConnection } from '../actions/connexion';
import { addRTCConn } from '../helpers/webRTC';

export default socket => ({ dispatch, getState }) => {
  if (socket) {
    socket.on('action', dispatch);
    socket.on('/game', (data) => {
      const { path } = data;
      const state = getState();
      switch (path) {
        case '/join': {
          console.log('peer received --', data);
          if (data.webRTCId !== state.peer.id) {
            const conn = state.peer.connect(data.webRTCId);
            conn.on('open', () => {
              addRTCConn(conn);
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
    console.log('action is -- ', action);
    if (socket && action.type === 'socket') {
      switch (action.data.call) {
        case '/game': {
          socket.emit('/game', action.data);
          break;
        }
        default:
          break;
      }
      socket.emit('action', action);
    }
    return next(action);
  };
};
