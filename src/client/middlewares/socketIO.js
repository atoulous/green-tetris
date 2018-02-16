import { setNickname, addPlayer } from '../actions/player';
import { addRTCConn, getPeer } from '../helpers/webRTC';

export default socket => ({ dispatch, getState }) => {
  if (socket) {
    socket.on('action', dispatch);
    socket.on('/player', (data) => {
      const { path } = data;
      switch (path) {
        case '/nickname': {
          const { webRTCId, nickname } = data;
          dispatch(setNickname({ webRTCId, nickname }));
          break;
        }
        default:
          break;
      }
    });
    socket.on('/game', (data) => {
      const { path } = data;
      switch (path) {
        case '/join': {
          console.log('peer received --', data);
          const peer = getPeer();
          const { webRTCId, nickname } = data;
          if (webRTCId !== peer.id) {
            const conn = peer.connect(webRTCId);
            conn.on('open', () => { addRTCConn(conn); });
            dispatch(addPlayer({ nickname, webRTCId }));
          }
          break;
        }
        default:
          break;
      }
    });
  }
  return next => (action) => {
    if (socket && action.type === 'socket') {
      switch (action.data.call) {
        case '/game': {
          socket.emit('/game', action.data);
          break;
        }
        case '/player': {
          socket.emit('/player', action.data);
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
