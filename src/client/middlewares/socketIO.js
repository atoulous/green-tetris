import * as Socket from '../socket';

export default () => ({ dispatch, getState }) => next => (action) => {
  const socket = Socket.getClient();
  if (!socket) console.log('Attention aucune socket definie');
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
