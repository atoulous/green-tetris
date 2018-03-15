import * as Socket from '../socket';

export default () => next => (action) => {
  const socket = Socket.getClient();
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
      case '/piece': {
        socket.emit('/piece', action.data);
        break;
      }
      default:
        break;
    }
  }
  return next(action);
};
