import { setGame } from '../actions/game';
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
        case '/list': {
          const { players } = data;
          console.log('setPlayers - ', data);
          dispatch(setPlayers({ players }));
          break;
        }
        default:
          break;
      }
    });
    socket.on('/game', (data) => {
      const { path } = data;
      switch (path) {
        case '/joined': {
          console.log('game received --', data);
          const peer = getPeer();
          const { game } = data;
          game.players.forEach(({ webRTCId }) => {
            if (webRTCId !== peer.id) {
              const conn = peer.connect(webRTCId);
              conn.on('open', () => { addRTCConn(conn); });
            }
          });
          break;
        }
        case '/updated': {
          console.log('game received --', data);
          const { game } = data;
          dispatch(setGame({ game }));
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
